import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface MobileItemProps {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-gray-500
        hover:text-black
        hover:bg-lime-300
      `}
    >
      <div
        className={`
          flex
          justify-center
          items-center
          bg-white
          w-9
          h-9
          shadow-lg
          rounded-full
        `}
      >
        <Icon
          className={`
          h-6
          w-6

        `}
        />
      </div>
    </Link>
  );
};

export default MobileItem;
