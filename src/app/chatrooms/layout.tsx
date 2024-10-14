import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import DesktopSideMenu from './components/DesktopSideMenu';
import getCurrentUser from '../actions/getCurrentUser';

const ChatroomsLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
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
