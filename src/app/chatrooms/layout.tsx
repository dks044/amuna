import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import DesktopSideMenu from './components/DesktopSideMenu';

const ChatroomsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full'>
        <DesktopSideMenu />
        {children}
      </div>
    </Sidebar>
  );
};

export default ChatroomsLayout;
