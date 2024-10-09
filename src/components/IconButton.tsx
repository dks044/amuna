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
        rounded-xl
        w-full
        h-full        
        leading-6
        font-semibold
      text-gray-500
      hover:text-black
      bg-gray-400
      hover:bg-gray-100
      `}
      onClick={onClick}
    >
      <Icon className='shrink-0' />
    </div>
  );
};

export default IconButton;
