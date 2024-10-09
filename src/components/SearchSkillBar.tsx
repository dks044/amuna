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
}

const SearchSkillBar = ({ label, onClickSkillItem }: SearchSkillBarProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStacks, setFilteredStacks] = useState<TechStack[]>([]);

  useEffect(() => {
    setFilteredStacks(
      techStacks.filter(stack => stack.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [searchTerm]);

  const handleClickSkillItem = useCallback(
    (skill: TechStack) => {
      onClickSkillItem(skill);
      setFilteredStacks([]);
    },
    [onClickSkillItem],
  );

  const handleBlur = () => {
    setFilteredStacks([]);
  };

  return (
    <div
      className='relative w-full max-w-md'
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    >
      {label && (
        <label className='block text-sm font-medium leading-6 text-gray-900 '>{label}</label>
      )}
      <div className='flex items-center bg-white rounded-lg px-3 py-2'>
        <CiSearch
          className={clsx('mr-2', isFocus ? 'text-lime-500' : 'text-gray-400', 'h-5 w-5')}
        />
        <input
          type='text'
          placeholder='기술 스택 검색'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onBlur={handleBlur}
          className='border-none outline-none flex-grow h-full placeholder:text-gray-400 focus:ring-0'
        />
      </div>
      {filteredStacks.length > 0 && (
        <ul className='absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-y-auto'>
          {filteredStacks.map((stack: TechStack, index) => (
            <li
              key={index}
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
