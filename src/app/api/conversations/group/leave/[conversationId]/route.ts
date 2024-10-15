import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { pusherServer } from '@/libs/pusher';

interface Iparam {
  conversationId: string;
}

export async function PUT(request: Request, { params }: { params: Iparam }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 대화방에서 사용자 제거
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Conversation not found', { status: 404 });
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        userIds: {
          set: existingConversation.userIds.filter(id => id !== currentUser.id),
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    const leaveMessage = await prisma.message.create({
      data: {
        body: `${currentUser.name}님이 나갔습니다`,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        chatroomLeave: true,
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    await pusherServer.trigger(currentUser.email!, 'conversation:update', updatedConversation);
    await pusherServer.trigger(conversationId, 'messages:new', leaveMessage);
    await pusherServer.trigger(currentUser.email!, 'publicConversation:leave', updatedConversation);

    return NextResponse.json(updatedConversation);
  } catch (error) {
    console.error('Error leaving conversation:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
