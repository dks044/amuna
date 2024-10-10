import { useParams } from 'next/navigation';
import { useMemo } from 'react';

//param에서 채팅방id 추출용
const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);
  //conversationsId가 존재하면 isOpen은 true가 되고,
  //존재하지 않으면 false 이는 현재 채팅방이 열려 있는지 유무 체크용
  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId],
  );
};

export default useConversation;
