import React from 'react';
import DeskTopSideBar from './DeskTopSideBar';
import MobileFooter from './MobileFooter';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <DeskTopSideBar />
      <MobileFooter />
      <main className='h-full lg:pl-20'>{children}</main>
    </div>
  );
};

export default Sidebar;
