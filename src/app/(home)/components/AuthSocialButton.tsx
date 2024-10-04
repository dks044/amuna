'use client';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='
      inline-flex
      w-full
      justify-center
      rounded-md
      px-4
      py-2
      text-grey-500
      bg-white
      ring-1 ring-inset ring-gray-300
      shadow-sm hover:bg-green-50
      focus:outline-offset-0'
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
