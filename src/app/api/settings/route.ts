import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, introduce, skills } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse(`Unauthorized`, { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
        introduce,
        tags: skills,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
