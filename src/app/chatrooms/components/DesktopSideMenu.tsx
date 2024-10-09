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
      pt-8
      border-r-[1px]
    `}
    >
      <div
        className={`
        flex
        justify-center
        items-center
        w-full
        h-3
      `}
      >
        <div className='text-4xl leading-6'>AMUNA</div>
        <div className='w-7 h-7 bg-transparent absolute right-3'>
          <IconButton icon={MdOutlineGroupAdd} />
        </div>
      </div>
    </div>
  );
};

export default DeskypSideMenu;
