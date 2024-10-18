'use client';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import Modal from '../modals/Modal';
import { FieldValues, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import Button from '../Button'; // Button 컴포넌트 임포트 추가
import toast from 'react-hot-toast'; // 알림을 위한 toast 임포트 추가
import axios from 'axios';

interface UserChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserChangePasswordModal: React.FC<UserChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/settings/password', { ...data });
      if (response.status === 200) {
        toast.success('비밀번호가 변경되었습니다.');
        onClose();
      }
    } catch (error) {
      toast.error('비밀번호 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex-1 h-100'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-12'>
            <div className='pb-12 border-b border-gray-900/10'>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>비밀번호 변경</h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>비밀번호를 수정하세요.</p>

              <div className='flex flex-col mt-10 gap-y-8'>
                <Input
                  disabled={isLoading}
                  label='현재 비밀번호'
                  id='password'
                  errors={errors}
                  required
                  register={register}
                  placeholder='현재 비밀번호 입력'
                  type='password'
                />
                <Input
                  disabled={isLoading}
                  label='새 비밀번호'
                  id='newPassword'
                  errors={errors}
                  required
                  register={register}
                  placeholder='새 비밀번호 입력'
                  type='password'
                />
              </div>
            </div>
          </div>

          <div className='flex items-center justify-end mt-6 gap-x-6'>
            <Button disbaled={isLoading} secondary onClick={onClose}>
              취소
            </Button>
            <Button disbaled={isLoading} type='submit'>
              저장
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserChangePasswordModal;
