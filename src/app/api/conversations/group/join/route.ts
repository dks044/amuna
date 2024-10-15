import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { pusherServer } from '@/libs/pusher';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = await request.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    //이미 해당 오픈채팅방에 들어왔을경우
    const existingConversations = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
        userIds: {
          has: currentUser.id,
        },
        isGroup: true,
      },
    });
    if (existingConversations) {
      return new NextResponse('exist User', { status: 409 });
    }

    // 채팅방에 사용자 추가
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        userIds: {
          push: currentUser.id,
        },
      },
      include: {
        users: true,
      },
    });

    // 입장 메시지 생성
    const enterMessage = await prisma.message.create({
      data: {
        body: `${currentUser.name}님이 입장했습니다.`,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        chatroomEnter: true, // 입장 메시지 플래그
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    // Pusher를 통해 실시간 업데이트
    updatedConversation.users.map(user => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:update', updatedConversation);
      }
    });

    pusherServer.trigger(currentUser.email, 'conversation:new', updatedConversation);

    // Pusher를 통해 클라이언트에 새로운 메시지 전송
    await pusherServer.trigger(conversationId, 'messages:new', enterMessage);

    return NextResponse.json(updatedConversation);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
