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
    await pusherServer.trigger(currentUser.email!, 'conversation:remove', updatedConversation);

    console.log('제거할 채팅방 id, => ', conversationId);
    // 사용자 대화방 ID 업데이트
    const userBeforeUpdate = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { conversationIds: true },
    });
    console.log('업데이트 전 => ', userBeforeUpdate?.conversationIds);

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        conversationIds: {
          set: userBeforeUpdate?.conversationIds.filter(id => id !== conversationId) || [],
        },
      },
    });

    console.log('업데이트 후 => ', updatedUser.conversationIds);
    return NextResponse.json(updatedConversation);
  } catch (error) {
    console.error('Error leaving conversation:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
