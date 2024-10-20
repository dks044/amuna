'use client';

import useRoutes from '@/hooks/useRoutes';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import DeskTopItem from './DeskTopItem';
import Avatar from '../Avatar';
import SettingModal from './SettingModal';

interface DeskTopSideBarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DeskTopSideBarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <SettingModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div
        className={`
        hidden
        lg:fixed
        lg:inset-y-0
        lg:left:0
        lg:z-40
        lg:w-20
        xl:px-6
        lg:overflow-y-auto
        lg:bg-lime-400
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
      `}
      >
        <nav
          className={`
          flex
          flex-col
          justify-between
          mt-4
        `}
        >
          <ul
            className={`
            flex
            flex-col
            items-center
            space-y-1
          `}
          >
            {routes.map(item => (
              <DeskTopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav
          className={`
          flex
          flex-col
          items-center
          justify-center
          mt-4
        `}
        >
          <div
            className={`
            transition
            cursor-pointer
            hover:opacity-75
            `}
            onClick={() => setIsOpen(true)}
          >
            <Avatar user={currentUser} settingModal />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
