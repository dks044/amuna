'use client';
import React, { useState } from 'react';
import Modal from '../modals/Modal';
import Button from '../Button'; // Button 컴포넌트 임포트 추가
import toast from 'react-hot-toast'; // 알림을 위한 toast 임포트 추가
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/settings/userdelete`);
      if (response.status === 200) {
        toast.success('계정이 삭제되었습니다.');
        signOut();
        router.push('/');
        onClose();
      }
    } catch (error) {
      toast.error('계정 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex-1 h-100'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>계정 삭제</h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>

        <div className='flex items-center justify-end mt-6 gap-x-6'>
          <Button disbaled={isLoading} secondary onClick={onClose}>
            취소
          </Button>
          <Button danger disbaled={isLoading} type='button' onClick={handleDelete}>
            탈퇴
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDeleteModal;
