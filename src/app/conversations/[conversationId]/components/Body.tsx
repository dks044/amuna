'use client';
import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';
import axios from 'axios';
import { find } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const { conversationId } = useConversation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    //TODO: API 구현해야함
    const messageHandler = (message: FullMessageType) => {
      //axios.post(`/api/conversations/${conversationId}/seen`);
      //채팅목록에 메시지 추가
      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    pusherClient.bind('messages:new', messageHandler);
    //해당 컴포넌트(Body.tsx) 언바운드 될때(사용 안할떄) unbound한다.
    return () => {
      //메모리 누수 방지를 위해
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
    };
  }, []);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1} //마지막 메시지인지 유무
          key={message.id}
          data={message}
        />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
