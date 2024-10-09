import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';
import DeskypSideMenu from './components/DesktopSideMenu';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full'>
        <DeskypSideMenu />
        {children}
      </div>
    </Sidebar>
  );
};

export default UserLayout;
