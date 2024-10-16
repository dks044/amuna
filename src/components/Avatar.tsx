import { User } from '@prisma/client';
import Image from 'next/image';
import React, { useState } from 'react';
import UserProfileModal from './users/UserProfileModal';

interface AvataProps {
  user?: User;
}

const Avatar = ({ user }: AvataProps) => {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const handleClick = (e: any) => {
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
          className={`
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
          cursor-pointer
        `}
        >
          <Image fill src={user?.image || '/images/placeholder.jpg'} alt='Avata' />
        </div>

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
      </div>
    </>
  );
};

export default Avatar;
