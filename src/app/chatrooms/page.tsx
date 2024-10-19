import React from 'react';
import DesktopUI from './components/DesktopUI';
import MobileUI from './components/MobileUI';
import getPulbicConversations from '../actions/getPulbicConversations';
import getCurrentUser from '../actions/getCurrentUser';

const ChatroomsPage = async () => {
  const publicConversations = await getPulbicConversations();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className='h-full'>
        <DesktopUI publicConversations={publicConversations} />
        <div>에러가 발생했습니다.</div>;
      </div>
    );
  }
  return (
    <div className='h-full'>
      <DesktopUI publicConversations={publicConversations} />
      <MobileUI currentUser={currentUser!} publicConversations={publicConversations} />
    </div>
  );
};

export default ChatroomsPage;
