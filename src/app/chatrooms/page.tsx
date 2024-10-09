import React from 'react';
import DesktopUI from './components/DesktopUI';
import MobileUI from './components/MobileUI';

const ChatroomsPage = () => {
  return (
    <div className='h-full'>
      <DesktopUI />
      <MobileUI />
    </div>
  );
};

export default ChatroomsPage;
