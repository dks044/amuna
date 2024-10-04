import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, gender } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      gender,
    },
  });

  return NextResponse.json(user);
}
