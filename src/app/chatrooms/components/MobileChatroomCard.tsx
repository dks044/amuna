import AvatarGroup from '@/components/AvataGroup';
import SkillIcon from '@/components/SkillIcon';
import { FullConversationType } from '@/types';
import React from 'react';

interface MobileChatroomCardProps {
  data: FullConversationType;
}

const MobileChatroomCard = ({ data }: MobileChatroomCardProps) => {
  const introduceText =
    data.name && data.name.length > 10
      ? `${data.name.slice(0, 10)}...`
      : data.name || '소개글이 없는 사용자에요.';

  return (
    <div
      className='flex flex-col w-28 rounded-md shadow-md bg-gray-100 transition hover:bg-gray-200
      justify-center items-center py-2 px-1
      ring-1 ring-inset ring-gray-300 cursor-pointer'
    >
      <div className='flex justify-center w-full'>
        {data.image ? (
          <img src={data.image} alt='Chat Thumbnail' className='w-16 h-16 rounded-full' />
        ) : (
          <div>
            <AvatarGroup users={data.users} />
          </div>
        )}
      </div>
      <div className='text-xs font-medium overflow-hidden whitespace-nowrap'>{introduceText}</div>
      <div className='text-xs text-gray-300'>{data.userIds.length}명 참여중</div>
      <div className='flex flex-wrap space-x-1 justify-center w-full'>
        {Array.from(data.tag).map(skill => (
          <div className='flex items-center mt-2' key={skill}>
            <SkillIcon skill={skill} notLabel />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileChatroomCard;
