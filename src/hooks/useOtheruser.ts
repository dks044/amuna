import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import { useMemo } from 'react';

const useOtheruser = async (conversation: FullConversationType | { users: User[] }) => {
  const session = await useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversation.users.filter(user => user.email !== currentUserEmail);

    return otherUser[0];
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtheruser;
