'use client';
import Avatar from '@/components/Avatar';
import AvatarGroup from '@/components/AvataGroup';
import useActiveList from '@/hooks/useActiveList';
import useOtherUser from '@/hooks/useOtheruser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import { pusherClient } from '@/libs/pusher';
import { FullConversationType } from '@/types';
import useConversation from '@/hooks/useConversation';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  currentUser: User;
}

const Header = ({ conversation, currentUser }: HeaderProps) => {
  const [item, setItem] = useState<FullConversationType | null>(null);
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { conversationId } = useConversation();

  const { members } = useActiveList();

  console.log(members); // members의 값을 로그로 확인
  const isActive = Array.isArray(members) && members.indexOf(otherUser?.id.toString()) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${item?.users.length} members`;
    }

    return isActive ? 'Online' : 'Offline';
  }, [conversation, isActive]);

  const pusherKey = currentUser.email;
  useEffect(() => {
    pusherClient.subscribe(pusherKey!);

    const updateHandler = (updateConversation: FullConversationType) => {
      setItem(updateConversation);
    };

    pusherClient.bind('conversation:update', updateHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey!);
      pusherClient.unbind('conversation:update', updateHandler);
    };
  }, [pusherKey, conversationId]);

  return (
    <React.Fragment>
      <ProfileDrawer
        currentUser={currentUser}
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
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
            <AvatarGroup thumbnail={conversation.image!} users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col '>
            <div>{conversation.name || otherUser?.name}</div>
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
