'use client';
import SearchBar from '@/components/SearchBar';
import React, { useState } from 'react';

const DesktopUI = () => {
  const [keyword, setKeyword] = useState<string>('');
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
        <div
          className='mt-3 text-3xl font-bold tracking-tight text-center shadow-lg py-4 px-4 w-max bg-white sm:rounded-lg text-gray-900
          dd'
        >
          <div>관심사 채팅방 찾기</div>
        </div>
      </div>
      <div className='w-full flex justify-center items-center'>
        <div className='w-full max-w-md mt-4'>
          <SearchBar onChange={setKeyword} value={keyword} />
        </div>
      </div>
    </div>
  );
};

export default DesktopUI;
