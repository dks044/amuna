import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import DesktopSideMenu from './components/DesktopSideMenu';
import getCurrentUser from '../actions/getCurrentUser';

const ChatroomsLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className='h-full'>
        <div>에러가 발생했습니다.</div>;
      </div>
    );
  }
  return (
    <Sidebar>
      <div className='h-full'>
        <DesktopSideMenu currentUser={currentUser!} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ChatroomsLayout;
