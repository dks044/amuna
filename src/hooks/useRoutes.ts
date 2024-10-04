import { signOut } from 'next-auth/react';
import { usePathname } from 'next/dist/client/components/navigation';
import { HiChat, HiUsers } from 'react-icons/hi';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import useConversation from './useConversation';
const useRoutes = () => {
  const pathName = usePathname();
  const { isOpen, conversationsId } = useConversation();
  const routes = [
    {
      label: 'chat',
      href: '/conversations',
      icon: HiChat,
      active: pathName === '/conversations' || isOpen,
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathName === '/users',
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle,
    },
  ];

  return routes;
};

export default useRoutes;
