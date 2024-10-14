import prisma from '@/libs/prismadb';

const getPulbicConversations = async () => {
  try {
    const pulbicConversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        isGroup: true,
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return pulbicConversations;
  } catch (error: any) {
    return [];
  }
};

export default getPulbicConversations;
