import React from 'react';
import { IconType } from 'react-icons/lib';

interface IconButtonProps {
  icon: IconType;
  onClick?: () => void;
}
const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <div
      className={`
        flex
        justify-center
        items-center
        rounded-2xl
        w-full
        h-full        
        leading-6
        font-semibold
      text-gray-400
      hover:text-black
      bg-gray-200
      hover:bg-gray-100
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
