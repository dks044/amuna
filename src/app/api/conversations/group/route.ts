import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { pusherServer } from '@/libs/pusher';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const { name, image, isGroup, createdBy, skills } = await request.json();

    const newConversation = await prisma.conversation.create({
      data: {
        name,
        image,
        isGroup,
        createdBy,
        tag: skills,
        users: {
          connect: [
            {
              id: createdBy,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    //오픈채팅방 목록 실시간 생성
    pusherServer.trigger('all', 'open_conversation:new', newConversation);
    //채팅방 리스트 생성
    pusherServer.trigger(currentUser.email, 'conversation:new', newConversation);

    return NextResponse.json(newConversation);
  } catch (error) {
    return NextResponse.json('Internal Error', { status: 500 });
  }
}
