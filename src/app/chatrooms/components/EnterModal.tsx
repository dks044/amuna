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
import { FaCirclePlay } from 'react-icons/fa6';
import LoadingModal from '@/components/modals/LoadingModal';
import { error } from 'console';
interface ConfirmModalProps {
  conversation: Conversation;
  isOpen?: boolean;
  onClose: () => void;
}

const EnterModal = ({ isOpen, onClose, conversation }: ConfirmModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    axios
      .post(`/api/conversations/group/join`, { conversationId: conversation.id })
      .then(() => {
        router.push(`/conversations/${conversation.id}`);
      })
      .catch(error => {
        console.log(error);
        toast.error('에러가 발생했습니다.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading && <LoadingModal show={isLoading} />}
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className='sm:flex sm:items-start'>
          <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-lime-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
            <FaCirclePlay className='w-6 h-6 text-lime-500 ' />
          </div>
          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
            <DialogTitle as='h3' className='text-base font-semibold leading-6 text-gray-900'>
              관심사 채팅방 참여
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                '{conversation?.name}'&nbsp;에 입장하시겠습니까?
              </p>
            </div>
          </div>
        </div>
        <div className='mt-5 sm:mt-4 sm:flex sm:w-full'>
          <Button disbaled={isLoading} fullWidth danger onClick={handleClick}>
            입장
          </Button>
          <Button disbaled={isLoading} fullWidth secondary onClick={onClose}>
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EnterModal;
