import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { tags } = body;
    const currentUser = await getCurrentUser();
    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse('Unauthorized!', { status: 500 });
    }

    const findUsers = await prisma.user.findMany({
      where: {
        NOT: {
          id: currentUser.id,
        },
        tags: {
          hasSome: tags,
        },
      },
    });
    return NextResponse.json(findUsers);
  } catch (error) {
    return [];
  }
}
