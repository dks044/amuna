'use client';
import IconButton from '@/components/IconButton';
import useConversation from '@/hooks/useConversation';
import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import clsx from 'clsx';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();
  const [isModealOpen, setIsModealOpen] = useState(false);

  return (
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
      `,
        isOpen ? 'hidden' : 'block w-full left-0',
      )}
    >
      <div className='px-5'>
        <div className='flex justify-center items-center pt-6 mb-4'>
          <div className='text-2xl font-bold text-neutral-800'>AMUNA</div>
          <div className='w-7 h-7 bg-transparent absolute right-3'>
            <IconButton icon={MdOutlineGroupAdd} onClick={() => setIsModealOpen(true)} />
          </div>
        </div>
        {items.map(item => (
          <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
