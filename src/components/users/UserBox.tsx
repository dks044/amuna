'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingModal from '../modals/LoadingModal';
import clsx from 'clsx';
import Avatar from '../Avatar';
import { useRouter } from 'next/navigation';
import EnterModal from '@/app/chatrooms/components/EnterModal';
import UserProfileModal from './UserProfileModal';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);

  const introduceText =
    data.introduce && data.introduce.length > 12
      ? `${data.introduce.slice(0, 17)}...`
      : data.introduce || '소개글이 없는 사용자에요.';

  return (
    <>
      <EnterModal
        isOpen={isEnterModalOpen}
        onClose={() => setIsEnterModalOpen(false)}
        isPublic={false}
        user={data}
      />
      {isLoading && <LoadingModal show={isLoading} />}
      <div
        onClick={() => setIsEnterModalOpen(true)}
        className={clsx(
          `
          w-full
          relative
          flex
          items-center
          space-x-3
          p-3
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        `,
        )}
      >
        <Avatar user={data} />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex flex-col justify-between items-center mb-1 truncate'>
              {/* userName */}
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
              <p className='text-sm font-medium text-gray-400'>{introduceText}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
