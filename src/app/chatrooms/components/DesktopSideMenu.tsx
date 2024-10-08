'use client';
import getUsers from '@/app/actions/getUsers';
import IconButton from '@/components/IconButton';
import React from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

const DesktopSideMenu = async () => {
  return (
    <div
      className={`
      fixed
      inset-y-0
      left-0
      lg:left-20
      hidden
      lg:block
      h-full
      bg-white
      lg:w-80
      flex-col
      pt-6
      border-r-[1px]
    `}
    >
      <div
        className={`
        flex
        justify-center
        items-center
        w-full
      `}
      >
        <div className='text-2xl font-bold text-neutral-800'>AMUNA</div>
        <div className='w-7 h-7 bg-transparent absolute right-3'>
          <IconButton icon={MdOutlineGroupAdd} />
        </div>
      </div>
    </div>
  );
};

export default DesktopSideMenu;
