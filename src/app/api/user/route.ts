import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tags = url.searchParams.getAll('tags');
    console.log('tags=>', tags); // 디버깅 용도

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
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
