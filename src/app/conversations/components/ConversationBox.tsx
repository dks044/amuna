import Avatar from '@/components/Avatar';
import AvataGroup from '@/components/AvataGroup';
import useOtherUser from '@/hooks/useOtheruser';
import { FullConversationType } from '@/types';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { format } from 'date-fns';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const lastMessage = useMemo(() => {
    const massages = data.messages || [];
    return massages[massages.length - 1];
  }, [data.messages]);

  const lasgMessageText = useMemo(() => {
    //마지막 메시지가 이미지일 경우
    if (lastMessage?.image) {
      return '이미지를 전송했습니다.';
    }

    //마지막 메시지 텍스트
    if (lastMessage?.body) {
      return lastMessage?.body;
    }
    return '대화를 시작했습니다.';
  }, [lastMessage]);

  const userEmail = session.data?.user?.email;

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    //해당 메시지를 본 사람들이 배열에 할당
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    //현재 유저가 봤으면 length가 0이 아니니 true
    return seenArray.filter(user => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };

  return (
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
        mb-3
      `,
        selected ? 'bg-neutral-300' : 'bg-white',
      )}
    >
      {data.isGroup ? (
        <AvataGroup thumbnail={data.image!} users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className='flex-1 min-w-0 '>
        <div className='focus:outline-none'>
          <div className='flex items-center justify-between mb-1'>
            <p className='font-medium text-gray-900 text-md'>{data.name || otherUser?.name}</p>
            {lastMessage?.cretedAt && (
              <p className='text-xs font-light text-gray-400'>
                {format(new Date(lastMessage.cretedAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate
              text-sm

            `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium',
            )}
          >
            {lasgMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
