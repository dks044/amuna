'use client';
import { FullMessageType } from '@/types';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';
import { format } from 'date-fns';
import ImageModel from './ImageModel';
import Image from 'next/image';

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender.email;
  //메시지를 본 사용자들의 리스트 (user.name만 추출)
  const seenList = (data.seen || [])
    .filter(user => user.email !== session.data?.user?.email)
    .map(user => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-lime-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender.name}</div>
          <div className='text-xs text-gray-400'>{format(new Date(data.cretedAt), 'p')}</div>
        </div>
      </div>
      <div className={message}>
        <ImageModel
          src={data.image}
          isOpen={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
        />
        {data.image ? (
          <Image
            alt='Image'
            height={288}
            width={288}
            onClick={() => setImageModalOpen(true)}
            src={data.image}
            className='object-cover transition cursor-pointer hover:scale-110 translate'
          />
        ) : (
          <>
            <div>{data.body}</div>
          </>
        )}
        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
