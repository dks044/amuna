import getCurrentUser from '@/app/actions/getCurrentUser';
import { pusherServer } from '@/libs/pusher';
import redis from '@/libs/redis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await redis.lpush('Active', currentUser.id);

    const activeUserList = await redis.lrange('Active', 0, -1);

    const parsedUserList = activeUserList;

    await pusherServer.trigger('amuna-online', 'user-connected', {
      userId: currentUser.id,
    });

    return NextResponse.json(parsedUserList);
  } catch (error) {
    console.log(error);
    return new NextResponse('Network & Server Error', { status: 500 });
  }
}
