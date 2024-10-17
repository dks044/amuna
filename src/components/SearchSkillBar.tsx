'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import clsx from 'clsx';
import { TechStack } from '@/types/types';
import SkillIcon from './SkillIcon';

const techStacks: TechStack[] = [
  'Java',
  'Spring Boot',
  'Spring Data JPA',
  'Spring Security',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'React Native',
  'Node.js',
  'Nest.js',
  'Express.js',
  'Kotlin',
  'Android Studio',
  'Swift',
  'Unity',
  'Unreal',
];

interface SearchSkillBarProps {
  label?: string;
  onClickSkillItem: (skill: TechStack) => void;
  shadow?: boolean;
  fullWidth?: boolean;
  isMobile?: boolean;
}

const SearchSkillBar = ({
  label,
  onClickSkillItem,
  shadow,
  fullWidth,
  isMobile,
}: SearchSkillBarProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStacks, setFilteredStacks] = useState<TechStack[]>(techStacks);

  const handleClickSkillItem = (skill: TechStack) => {
    onClickSkillItem(skill);
    setSearchTerm('');
  };

  useEffect(() => {
    if (searchTerm === '' || searchTerm.length === 0) {
      setFilteredStacks([]);
    } else {
      setFilteredStacks(
        techStacks.filter(stack => stack.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }
  }, [searchTerm]);

  return (
    <div
      className={clsx(`max-w-md rounded-lg`, shadow && 'shadow-lg', fullWidth && 'w-full')}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    >
      {label && (
        <label className='block text-sm font-medium leading-6 text-gray-900 '>{label}</label>
      )}
      <div
        className={clsx(
          `border-0  ring-1 ring-inset ring-gray-300 focus:ring-orange-600 flex items-center rounded-lg px-3 py-1`,
          isFocus ? 'bg-gray-100' : 'bg-white',
        )}
      >
        <CiSearch
          className={clsx('mr-2', isFocus ? 'text-lime-500' : 'text-gray-400', 'h-5 w-5')}
        />
        <input
          type='text'
          placeholder='관심사 검색'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={clsx(
            'border-none outline-none flex-grow  placeholder:text-gray-400 focus:ring-0',
            isFocus ? 'bg-gray-100' : 'bg-white',
          )}
        />
      </div>

      {filteredStacks.length > 0 && (
        <ul
          className={clsx(
            `relative  bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-y-auto transition`,
            //isMobile ? 'max-w-full' : 'w-full',
          )}
        >
          {filteredStacks.map((stack: TechStack) => (
            <li
              key={stack}
              className='flex py-2 px-4 hover:bg-gray-100 cursor-pointer items-center'
              onClick={() => handleClickSkillItem(stack)}
            >
              <SkillIcon skill={stack} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSkillBar;
