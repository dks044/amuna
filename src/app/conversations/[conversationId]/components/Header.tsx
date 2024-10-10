'use client';
import Avatar from '@/components/Avatar';
import AvatarGroup from '@/components/AvataGroup';
import useActiveList from '@/hooks/useActiveList';
import useOtherUser from '@/hooks/useOtheruser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? '온라인' : '오프라인';
  }, [conversation, isActive]);

  return (
    <React.Fragment>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div
        className='
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
        '
      >
        <div className='flex items-center gap-3'>
          <Link
            href='/conversations'
            className='block text-lime-500 transition cursor-pointer lg:hidden hover:text-lime-600'
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col '>
            <div>{conversation.name || otherUser.name}</div>
            <div className='text-sm font-light text-neutral-500'>{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          className='text-lime-500 transition cursor-pointer hover:text-lime-600'
          onClick={() => setDrawerOpen(true)}
          size={32}
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
