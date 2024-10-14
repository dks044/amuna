import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import ConversationList from './components/ConversationList';
import getUsers from '../actions/getUsers';
import getConversations from '../actions/getConversations';
import getCurrentUser from '../actions/getCurrentUser';

const ConversationsLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  const conversations = await getConversations();
  const currentUser = await getCurrentUser();
  return (
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          currentUser={currentUser!}
          users={users}
          title='Messages'
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
