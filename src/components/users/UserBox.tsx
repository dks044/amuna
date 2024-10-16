'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingModal from '../modals/LoadingModal';
import clsx from 'clsx';
import Avatar from '../Avatar';
import { useRouter } from 'next/navigation';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    axios
      .post('api/conversations', { userId: data.id })
      .then(response => {
        router.push(`/conversations/${response.data.id}`); // conversationId
      })
      .catch(error => {
        toast.error('에러가 발생했습니다!');
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  const introduceText =
    data.introduce && data.introduce.length > 12
      ? `${data.introduce.slice(0, 15)}...`
      : data.introduce || '소개글이 없는 사용자에요.';

  return (
    <>
      {isLoading && <LoadingModal show={isLoading} />}
      <div
        onClick={handleClick}
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
