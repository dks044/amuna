'use client';
import IconButton from '@/components/IconButton';
import React from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

const DeskypSideMenu = () => {
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
      pt-5
      border-r-[1px]
    `}
    >
      <div
        className={`
        flex
        justify-between
        items-center
        w-full
        h-3
        px-2
      `}
      >
        <div className='text-2xl'>AMUNA</div>
        <div className='w-5 h-5 shadow-lg rounded -lg'>
          <IconButton icon={MdOutlineGroupAdd} />
        </div>
      </div>
    </div>
  );
};

export default DeskypSideMenu;
