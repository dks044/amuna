import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';
import clsx from 'clsx';

interface DeskTopItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DeskTopItem = ({ label, href, icon: Icon, active, onClick }: DeskTopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:text-black
          bg-white
          hover:bg-gray-100
        `,
          active && 'bg-gray-200 text-black',
        )}
      >
        <Icon
          className={`
            w-6
            h-6
            shrink-0
          `}
        />
        <span
          className={`
            sr-only
          `}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};
export default DeskTopItem;
