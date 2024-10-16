import redis from '@/libs/redis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const code = searchParams.get('code');

    const emailCode = await redis.get(email!);

    if (emailCode !== code) {
      return new NextResponse('Invalid Email Code', { status: 400 });
    }

    return new NextResponse('Success Email Code', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Invalid Email Code', { status: 400 });
  }
}
