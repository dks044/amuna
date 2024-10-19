'use client';
import Button from '@/components/Button';
import Modal from '@/components/modals/Modal';
import useConversation from '@/hooks/useConversation';
import { Dialog, DialogTitle } from '@headlessui/react';
import { Conversation, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';
interface ConfirmModalProps {
  data?: Conversation;
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const ConfirmModal = ({ isOpen, onClose, currentUser, data }: ConfirmModalProps) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = () => {
    setIsLoading(true);

    if (!data) {
      // 데이터가 없는 경우 처리
      toast.error('데이터가 없습니다.');
      setIsLoading(false);
      return;
    }

    if (!data.isGroup) {
      // 일반 채팅방 삭제
      axios
        .delete(`/api/conversations/${conversationId}`)
        .then(() => {
          onClose();
          router.push('/conversations');
          router.refresh();
        })
        .catch(() => toast.error('에러가 발생했습니다.'))
        .finally(() => setIsLoading(false));
    } else if (data.createdBy === currentUser.id) {
      // 오픈채팅방을 만든 사람인 경우
      axios
        .delete(`/api/conversations/${conversationId}`)
        .then(() => {
          onClose();
          router.push('/conversations');
          router.refresh();
        })
        .catch(() => toast.error('에러가 발생했습니다.'))
        .finally(() => setIsLoading(false));
    } else {
      // 오픈채팅방이지만 만든 사람이 아닌 경우
      axios
        .put(`/api/conversations/group/leave/${conversationId}`)
        .then(() => {
          onClose();
          router.push('/conversations');
        })
        .catch(() => toast.error('에러가 발생했습니다.'))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
          <FiAlertTriangle className='w-6 h-6 text-red-600 ' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <DialogTitle as='h3' className='text-base font-semibold leading-6 text-gray-900'>
            {data?.createdBy === currentUser?.id ? <>채팅방 삭제</> : <>채팅방 나가기</>}
          </DialogTitle>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              {data?.createdBy === currentUser?.id ? (
                <>이 채팅방을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.</>
              ) : (
                <>채팅방 나가기</>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:w-full'>
        <Button disbaled={isLoading} fullWidth danger onClick={onDelete}>
          {data?.createdBy === currentUser?.id ? <>삭제</> : <>나가기</>}
        </Button>
        <Button disbaled={isLoading} fullWidth secondary onClick={onClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
