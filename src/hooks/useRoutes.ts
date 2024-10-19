import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { HiChat, HiUsers } from 'react-icons/hi';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import useConversation from './useConversation';
import { useMemo } from 'react';
import useLogout from './useLogout';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Chatrooms',
        href: '/chatrooms',
        icon: HiUsers,
        active: pathname === '/chatrooms',
      },
      {
        label: 'Logout',
        onClick: async () => {
          await useLogout();
          await signOut({ callbackUrl: '/' });
        },
        href: '#',
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId],
  );

  return routes;
};

export default useRoutes;
