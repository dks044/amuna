'use client';
import useActiveList from '@/hooks/useActiveList';
import { pusherClient } from '@/libs/pusher';
import { User } from '@prisma/client';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const ActiveContext = () => {
  const session = useSession();

  const { members, add, remove, set } = useActiveList();
  //console.log(members);
  //userid redis 할당 및 redis에서 'Active' 인 userid들을 들고옴 (return 값)
  const connectedUser = async () => {
    try {
      const response = await axios.get('/api/user_connected');
      if (Array.isArray(response.data)) {
        set(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error connecting user:', error);
    }
  };

  const disConnectedUser = () => {
    axios.post('/api/user_disconnected');
  };

  useEffect(() => {
    pusherClient.subscribe('amuna-online');
    if (session.data?.user) {
      if (!members.includes(session.data.user.id)) {
        connectedUser();
      }
    }
    const newConnectedUser = (userId: string) => {
      add(userId);
    };
    const removeConnectedUser = (userId: string) => {
      remove(userId);
    };

    window.addEventListener('beforeunload', disConnectedUser);
    pusherClient.bind('user-connected', newConnectedUser);
    pusherClient.bind('user-disconnected', removeConnectedUser);
    return () => {
      pusherClient.unsubscribe('presence-channel');
      pusherClient.unbind('user-connected', newConnectedUser);
      pusherClient.unbind('user-disconnected', removeConnectedUser);
      window.removeEventListener('beforeunload', disConnectedUser);
    };
  }, [session.data?.user]);

  if (!session.data?.user) return null;
  return <div className='hidden'></div>;
};

export default ActiveContext;
