import React from 'react';
import { IconType } from 'react-icons/lib';

interface IconButtonProps {
  icon: IconType;
  onClick?: () => void;
}

const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <div
      role='button'
      aria-label='아이콘 버튼'
      tabIndex={0}
      className={`
        flex
        justify-center
        items-center
        rounded-full
        w-full
        h-full        
        leading-6
        font-semibold
        text-gray-600
        transition
        hover:text-black
        bg-gray-100
        hover:opacity-50
        cursor-pointer
        shadow-md
        px-4
      `}
      onClick={onClick}
    >
      <Icon className='shrink-0' />
    </div>
  );
};

export default IconButton;
