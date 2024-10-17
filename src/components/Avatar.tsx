import { User } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react';
import UserProfileModal from './users/UserProfileModal';
import { FaTools } from 'react-icons/fa';
import clsx from 'clsx';

interface AvataProps {
  user?: User;
  notVisibleActive?: boolean;
  settingModal?: boolean;
  isMobile?: boolean;
}

const Avatar = ({ user, notVisibleActive, settingModal, isMobile }: AvataProps) => {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const handleClick = (e: any) => {
    if (settingModal) {
      return;
    }
    e.stopPropagation();
    setIsProfileModal(true);
  };

  return (
    <>
      <UserProfileModal
        isOpen={isProfileModal}
        onClose={() => setIsProfileModal(false)}
        user={user!}
      />
      <div className='relative' onClick={e => handleClick(e)}>
        <div
          className={clsx(
            `
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
          cursor-pointer
        `,
            isMobile && 'transform hover:scale-110',
          )}
        >
          <Image fill src={user?.image || '/images/placeholder.jpg'} alt='Avata' />
        </div>
        {notVisibleActive ? (
          <span
            className={`
                  absolute
                  block
                  rounded-full
                  bg-transparent
                  ring-2
                  ring-white
                  top-0
                  right-3
                  h-2 
                  w-2
                  md-h-3
                  md-w-3
                  transform
                  hover:scale-110
                  `}
          >
            <FaTools className='text-lime-500' />
          </span>
        ) : (
          <span
            className={`
          absolute
          block
          rounded-full
          bg-green-500
          ring-2
          ring-white
          top-0
          right-0
          h-2 
          w-2
          md-h-3
          md-w-3
          `}
          />
        )}
      </div>
    </>
  );
};

export default Avatar;
