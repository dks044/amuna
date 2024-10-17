import React from 'react';
import DesktopUI from './components/DesktopUI';
import MobileUI from './components/MobileUI';
import getPulbicConversations from '../actions/getPulbicConversations';
import getCurrentUser from '../actions/getCurrentUser';

const ChatroomsPage = async () => {
  const publicConversations = await getPulbicConversations();
  const currentUser = await getCurrentUser();
  return (
    <div className='h-full'>
      <DesktopUI publicConversations={publicConversations} />
      <MobileUI currentUser={currentUser!} publicConversations={publicConversations} />
    </div>
  );
};

export default ChatroomsPage;
