import AvatarGroup from '@/components/AvataGroup';
import SkillIcon from '@/components/SkillIcon';
import { FullConversationType } from '@/types';
import React from 'react';

interface MobileChatroomCardProps {
  data: FullConversationType;
}

const MobileChatroomCard = ({ data }: MobileChatroomCardProps) => {
  return (
    <div
      className='flex flex-col w-28 rounded-md shadow-md bg-gray-100 transiton hover:bg-gray-200
    justify-center items-center py-2 px-2
    ring-1 ring-inset ring-gray-300 transition
    '
    >
      {data.image ? (
        <img src={data.image} alt='Chat Thumbnail' className='w-16 h-16 rounded-full mr-3' />
      ) : (
        <div>
          <AvatarGroup users={data.users} />
        </div>
      )}
      <div className='text-sm truncate font-medium'>{data.name}</div>
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
