'use client';
import { User } from '@prisma/client';
import React from 'react';
import Modal from '../modals/Modal';
import Image from 'next/image';
import { format } from 'date-fns';
import SkillIcon from '../SkillIcon';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const UserProfileModal = ({ isOpen, onClose, user }: UserProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col p-6'>
        <h2 className='text-xl font-semibold mb-4'>프로필</h2>

        <div className='flex items-center mb-4'>
          <Image
            width={48}
            height={48}
            className='rounded-full'
            src={user.image || '/images/placeholder.jpg'}
            alt='User Avatar'
          />
          <div className='ml-4'>
            <h3 className='text-lg font-medium'>{user.name}</h3>
          </div>
        </div>

        <div className='mb-4'>
          <h4 className='font-medium'>소개글</h4>
          <p className='text-sm text-gray-500 font-notosans'>
            {user.introduce || '소개글이 없습니다.'}
          </p>
        </div>

        <div className='mb-4'>
          <h4 className='font-medium '>관심사</h4>
          <div className='flex gap-2 flex-wrap'>
            {Array.from(user.tags).map(skill => (
              <div className='flex items-center' key={skill}>
                <SkillIcon skill={skill} />
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <h4 className='font-medium'>가입일</h4>
          <p className='text-sm text-gray-500 font-notosans'>
            {format(new Date(user.createdAt), 'PP')}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfileModal;
