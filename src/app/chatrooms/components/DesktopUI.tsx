'use client';
import React from 'react';

const DesktopUI = () => {
  return (
    <div
      className={`

      hidden
      h-full
      w-full
      lg:block
      grid-background
      py-8
      px-8
      pl-80
      `}
    >
      <div className='flex flex-col w-full justify-center items-center'>
        <div className=' mt-6 text-3xl font-bold tracking-tight text-center shadow-lg py-4 px-4 w-max bg-white sm:rounded-lg text-gray-900 '>
          AMUNA
        </div>
        {/* <SearchBar
          value={value}
          onChange={}
        /> */}
      </div>
    </div>
  );
};

export default DesktopUI;
