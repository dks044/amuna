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

    const activeUserList = await redis.lrange('Active', 0, -1);
    const existingRedisData = activeUserList.includes(currentUser.id);

    if (existingRedisData) {
      return NextResponse.json(activeUserList); // 기존 사용자 목록을 반환
    }

    await redis.lpush('Active', currentUser.id);

    // 사용자 목록을 업데이트하여 반환
    const updatedUserList = await redis.lrange('Active', 0, -1);

    await pusherServer.trigger('amuna-online', 'user-connected', {
      userId: currentUser.id,
    });

    return NextResponse.json(updatedUserList);
  } catch (error) {
    console.log(error);
    return new NextResponse('Network & Server Error', { status: 500 });
  }
}
