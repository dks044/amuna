import React, { useEffect } from 'react';
import { User } from '@prisma/client';
import { FullConversationType } from '@/types';
import SkillIcon from '@/components/SkillIcon';
import { TiDelete } from 'react-icons/ti';
import clsx from 'clsx';
import { TechStack } from '@/types/types';
import AvatarGroup from '@/components/AvataGroup';

interface ChatroomCardInterface {
  data: FullConversationType;
}

const ChatroomCard = ({ data }: ChatroomCardInterface) => {
  const chatRoomTag = data.tag as TechStack[];

  return (
    <div className='flex flex-col ring-1 ring-inset ring-gray-300 p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer'>
      <div className='flex items-center mb-2'>
        {data.image ? (
          <img src={data.image} alt='Chat Thumbnail' className='w-16 h-16 rounded-full mr-3' />
        ) : (
          <div>
            <AvatarGroup users={data.users} />
          </div>
        )}
        <div className='flex-col max-md:w-10 truncate'>
          <h2 className='text-lg'>{data.name}</h2>
          <div className='text-gray-300 text-sm'>{data.users.length}명 참여중</div>
        </div>
      </div>
      <div className='relative flex flex-wrap mt-2 h-full gap-2'>
        {chatRoomTag.length === 0 ? (
          <div className='font-notosans text-sm text-gray-300 underline'>태그가 없는방이에요.</div>
        ) : (
          Array.from(chatRoomTag).map(tag => (
            <div className='flex items-center' key={tag}>
              <SkillIcon skill={tag} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatroomCard;
