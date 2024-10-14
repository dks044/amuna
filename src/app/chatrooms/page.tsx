import React from 'react';
import DesktopUI from './components/DesktopUI';
import MobileUI from './components/MobileUI';
import getPulbicConversations from '../actions/getPulbicConversations';

const ChatroomsPage = async () => {
  const publicConversations = await getPulbicConversations();

  return (
    <div className='h-full'>
      <DesktopUI publicConversations={publicConversations} />
      <MobileUI />
    </div>
  );
};

export default ChatroomsPage;
