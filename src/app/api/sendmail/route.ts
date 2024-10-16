import { sendEmail } from '@/libs/mail';
import { NextResponse } from 'next/server';
import redis from '@/libs/redis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    const existingData = await redis.get(email);
    if (existingData) {
      return new NextResponse('existing Mail Code, not yet 3minute', { status: 400 });
    }

    await redis.set(email, code, 'EX', 180);
    // 이메일 전송
    const sendCodeMail = await sendEmail(email, code);
    return NextResponse.json(sendCodeMail);
  } catch (error) {
    console.log(error);
    return new NextResponse('SMTP Error', { status: 500 });
  }
}
