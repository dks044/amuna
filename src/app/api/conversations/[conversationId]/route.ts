import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import { pusherServer } from '@/libs/pusher';
import { deleteImageFromCloudinary } from '@/app/utils/cloudInary';

interface Iparam {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Iparam }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Invalid Id', { status: 404 });
    }

    const deleteImagePromises = existingConversation.messages.map(async message => {
      if (message.image) {
        await deleteImageFromCloudinary(message.image);
      }
    });
    await Promise.all(deleteImagePromises);

    existingConversation.users.forEach(user => {
      if (user.email) {
        pusherServer.trigger(user.email!, 'conversation:remove', existingConversation);
      }
    });
    pusherServer.trigger(currentUser.email!, 'conversation:remove', existingConversation);

    // 1대1 채팅방 상대방도 제거
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    const updateUsers = existingConversation.users.forEach(async user => {
      // 사용자 대화방 ID 업데이트
      const userBeforeUpdate = await prisma.user.findUnique({
        where: { id: user.id },
        select: { conversationIds: true },
      });
      console.log('업데이트 전 => ', userBeforeUpdate?.conversationIds);

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          conversationIds: {
            set: userBeforeUpdate?.conversationIds.filter(id => id !== conversationId) || [],
          },
        },
      });
      console.log('업데이트 후 => ', updatedUser.conversationIds);
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
