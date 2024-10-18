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

    //채팅방 안에 이미지메시지 제거
    const deleteImagePromises = existingConversation.messages.map(async message => {
      if (message.image) {
        await deleteImageFromCloudinary(message.image);
      }
    });

    await Promise.all(deleteImagePromises);

    //1대1 채팅방 상대방도 제거
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach(user => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
        pusherServer.trigger('all', 'open_conversation:remove', existingConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse('error', { status: 500 });
  }
}
