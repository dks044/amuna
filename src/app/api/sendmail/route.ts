import { sendEmail } from '@/libs/mail';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('code', code);

    const sendCodeMail = await sendEmail(formData);

    return NextResponse.json(sendCodeMail);
  } catch (error) {
    console.log(error);
    return new NextResponse('SMTP Error', { status: 500 });
  }
}
