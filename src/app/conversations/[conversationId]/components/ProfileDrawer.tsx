'use client';
import useOtherUser from '@/hooks/useOtheruser';
import { Conversation, User } from '@prisma/client';
import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import useActiveList from '@/hooks/useActiveList';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;

  //채팅방 참여한 유저들
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer = ({ isOpen, onClose, data }: ProfileDrawerProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);

  const joinedDate = format(new Date(otherUser.createdAt), 'PP');
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isActive ? '온라인' : '오프라인';
  }, [data, isActive]);

  return <div>ProfileDrawer</div>;
};

export default ProfileDrawer;
