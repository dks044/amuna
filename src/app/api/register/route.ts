import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, gender, skills } = body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json({ error: '이미 사용중인 이메일입니다.' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      gender,
      tags: skills,
    },
  });

  return NextResponse.json(user);
}
