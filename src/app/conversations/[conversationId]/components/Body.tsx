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

  //메시지 본사람 post요청
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  // 메시지를 정렬
  useEffect(() => {
    const sortedMessages = [...messages].sort((a, b) => {
      return new Date(a.cretedAt).getTime() - new Date(b.cretedAt).getTime();
    });
    setMessages(sortedMessages);
  }, [initialMessages]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    //TODO: API 구현해야함
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      console.log('new Message => ', message);

      setMessages(current => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages(current =>
        current.map(currentMessage => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        }),
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('messages:update', updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('messages:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, index) => (
        <MessageBox isLast={index === messages.length - 1} key={message.id} data={message} />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
};

export default Body;
