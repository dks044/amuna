'use client';
import useConversation from '@/hooks/useConversation';
import axios from 'axios';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from 'react-icons/hi';

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setValue('message', '');
    axios.post(`/api/messages`, {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post('api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className={`
        flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4    
      `}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex items-center w-full gap-2 lg:gap-4'>
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='채팅을 입력해주세요.'
        />
        <button
          type='submit'
          className={`
            p-2 transition rounded-full
            cursor-pointer bg-lime-500
            hover:bg-lime-600  
          `}
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Form;
