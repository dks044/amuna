'use client';
import IconButton from '@/components/IconButton';
import useConversation from '@/hooks/useConversation';
import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash';
import OpenChatModal from '@/components/modals/OpenChatModal';
//import OpenChatModal from '@/components/modals/OpenChatModal';

interface ConversationListProps {
  initialItems: FullConversationType[];
  title?: string;
  currentUser: User;
}

const ConversationList = ({ initialItems, currentUser }: ConversationListProps) => {
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();
  const [isModealOpen, setIsModealOpen] = useState(false);
  const session = useSession();
  const pusherKey = session.data?.user?.email;

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems(current =>
        current.map(currentConversation => {
          if (currentConversation.id === conversationId) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        }),
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems(current => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems(current => {
        return [...current.filter(item => item.id !== conversation.id)];
      });
    };

    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:remove', removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    };
  }, [pusherKey]);

  return (
    <>
      <OpenChatModal
        currentUser={currentUser!}
        isOpen={isModealOpen}
        onClose={() => setIsModealOpen(false)}
      />
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
    </>
  );
};

export default ConversationList;
