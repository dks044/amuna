'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingModal from '../modals/LoadingModal';
import clsx from 'clsx';
import Avata from '../Avata';
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
      .then(data => {
        router.push(`/conversations/${data.data.id}`); //conversationId
      })
      .catch(error => {
        toast.error('에러가 발생했습니다!');
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

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
        <Avata />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <div className='flex justify-between items-center mb-1'>
              {/* userName */}
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
