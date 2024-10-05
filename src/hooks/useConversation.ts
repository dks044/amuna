'use client';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();

  const conversationsId = useMemo(() => {
    if (!params?.conversationsId) {
      return '';
    }
    return params.conversationsId;
  }, [params?.conversationsId]);

  const isOpen = !!conversationsId;
  //conversationsId가 존재하면 isOpen은 true가 되고,
  //존재하지 않으면 false 이는 현재 채팅방이 열려 있는지 유무 체크용

  return { conversationsId, isOpen };
};

export default useConversation;
