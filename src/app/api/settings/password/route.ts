import getCurrentUser from '@/app/actions/getCurrentUser';
import prsima from '@/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, newPassword } = body;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const isCorrectPassword = await bcrypt.compare(password, currentUser.hashedPassword!);
    if (!isCorrectPassword) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updateUser = await prsima.user.update({
      where: {
        email: currentUser.email,
      },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return new NextResponse('User Update', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Server Error', { status: 500 });
  }
}
