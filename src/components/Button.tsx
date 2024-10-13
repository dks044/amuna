import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disbaled?: boolean;
}

const Button = ({
  type = 'button',
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disbaled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disbaled}
      className={clsx(
        `
      flex
      justify-center
      rounded-md
      px-3
      py-2
      text-sm
      font-semibold
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2
      `,
        disbaled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-lime-500 hover:bg-lime-600 focus-visible:outline-lime-600 ',
      )}
    >
      {children}
    </button>
  );
};

export default Button;
