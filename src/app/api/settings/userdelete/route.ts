import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { deleteImageFromCloudinary } from '@/app/utils/cloudInary';
import { pusherServer } from '@/libs/pusher';

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 사용자의 모든 메시지 데이터 삭제
    await prisma.message.deleteMany({
      where: {
        senderId: currentUser.id,
      },
    });

    // 1대1 대화방들 찾기
    const existingPrivateConversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
        isGroup: false, // 1대1 대화방
      },
      include: {
        users: true,
        messages: true,
      },
    });

    // 오픈채팅방 찾기
    const existingPublicConversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
        isGroup: true, // 오픈채팅방
      },
      include: {
        users: true,
        messages: true,
      },
    });

    // 방장인 오픈채팅방 찾기
    const existingPublicConversationsByCreated = await prisma.conversation.findMany({
      where: {
        createdBy: currentUser.id,
        isGroup: true,
      },
      include: {
        users: true,
        messages: true,
      },
    });

    // 방장이 아닐 경우 사용자만 제거
    for (const conversation of existingPublicConversations) {
      if (!existingPublicConversationsByCreated.find(c => c.id === conversation.id)) {
        await prisma.conversation.update({
          where: { id: conversation.id },
          data: {
            userIds: {
              set: conversation.userIds.filter(id => id !== currentUser.id), // 방장 아닐 경우 사용자 제거
            },
          },
          include: {
            users: true,
          },
        });
      }
    }

    // 사용자 계정에 관련된 Account 데이터 삭제
    if (currentUser.oauth) {
      await prisma.account.deleteMany({
        where: {
          userId: currentUser.id,
        },
      });
    }

    // 사용자 프로필 사진 제거
    if (currentUser.image) {
      await deleteImageFromCloudinary(currentUser.image);
    }

    // 웹소켓 1대1 채팅방 삭제 적용
    for (const conversation of existingPrivateConversations) {
      for (const user of conversation.users) {
        if (user.email) {
          await pusherServer.trigger(user.email, 'conversation:remove', conversation);
        }
      }
    }

    // 웹소켓 오픈채팅방 삭제 적용
    for (const conversation of existingPublicConversationsByCreated) {
      for (const user of conversation.users) {
        if (user.email) {
          await pusherServer.trigger(user.email, 'conversation:remove', conversation);
        }
      }
    }

    // 오픈채팅방에 대한 웹소켓 이벤트 발행
    for (const conversation of existingPublicConversations) {
      for (const user of conversation.users) {
        if (user.email) {
          await pusherServer.trigger('all', 'open_conversation:remove', conversation);
        }
      }
    }

    // 방장일 경우 삭제
    await prisma.conversation.deleteMany({
      where: {
        createdBy: currentUser.id,
        isGroup: true,
      },
    });

    // 1대1 대화방 삭제
    await prisma.conversation.deleteMany({
      where: {
        userIds: {
          has: currentUser.id,
        },
        isGroup: false, // 1대1 대화방
      },
    });

    // 사용자 계정 삭제
    const deleteUser = await prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });

    return NextResponse.json(deleteUser);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error deleting account', { status: 500 });
  }
}
