'use client';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import clsx from 'clsx';

interface SearchBarProps {
  value: string;
  onChange: (e: any) => void;
  fullWidth?: boolean;
}

const SearchBar = ({ value, onChange, fullWidth }: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        `border-0 ring-1 ring-inset ring-gray-300 flex items-center h-full shadow-lg rounded-lg px-3 py-1`,
        isFocus ? 'bg-gray-100' : 'bg-white',
        fullWidth && 'w-full',
      )}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    >
      <div>
        <CiSearch
          className={clsx('mr-2', isFocus ? 'text-lime-500' : 'text-gray-400', 'h-5 w-5')}
        />
      </div>
      <input
        className={clsx(
          `
          border-none
          outline-none
          flex-grow
          h-full
          placeholder:text-gray-400
          focus:ring-0
        `,
          isFocus ? 'bg-gray-100' : 'bg-white',
        )}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder='검색어를 입력하세요'
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default SearchBar;
