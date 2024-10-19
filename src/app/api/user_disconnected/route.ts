import getCurrentUser from '@/app/actions/getCurrentUser';
import { userConnected, userDisconnected } from '@/hooks/useConnected';
import { pusherServer } from '@/libs/pusher';
import redis from '@/libs/redis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    await redis.lrem('Active', 0, currentUser.id);

    await pusherServer.trigger('amuna-online', 'user-disconnected', {
      userId: currentUser.id,
    });
    return new NextResponse('User DisConnected Success', { status: 200 });
  } catch (error) {
    return new NextResponse('Network & Server Error', { status: 500 });
  }
}
