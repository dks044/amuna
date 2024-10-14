import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/components/EmptyState';
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface Iparams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Iparams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const currentUser = await getCurrentUser();

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='flex flex-col h-full'>
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className='lg:pl-80 h-full'>
      <div className='flex flex-col h-full'>
        <Header currentUser={currentUser!} conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
