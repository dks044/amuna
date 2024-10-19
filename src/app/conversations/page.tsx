'use client';
import EmptyState from '@/components/EmptyState';
import useConversation from '@/hooks/useConversation';
import clsx from 'clsx';
import React from 'react';

const ConversationPage = () => {
  const { isOpen } = useConversation();

  if (!isOpen) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <div
      className={clsx(
        `
      lg:pl-80
      h-full
      lg:block
    `,
        isOpen ? 'block' : 'hidden',
      )}
    >
      <EmptyState />
    </div>
  );
};

export default ConversationPage;
