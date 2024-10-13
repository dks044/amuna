'use client';
import useConversation from '@/hooks/useConversation';
import axios from 'axios';
import React, { DOMElement, ReactElement, useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from 'react-icons/hi';
import { HiPhoto } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Form = () => {
  const { conversationId } = useConversation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (response: any) => {
    axios.post('/api/messages', {
      image: response.data.uploadedImageData.url,
      conversationId: conversationId,
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      // 파일 타입 검사
      if (!file.type.startsWith('image/')) {
        toast.error('이미지 파일만 올려주세요');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      // 파일 크기 검사 (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('2MB 미만으로 올려주세요');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET!);
      formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_CHAT_IMAGE_FOLDER_NAME!);
      try {
        const response = await axios.post(`/api/cloudinary`, formData);
        handleUpload(response);
      } catch (error) {
        console.log(error);
        toast.error('에러가 발생했습니다.');
      }
    }
  };

  return (
    <div
      className={`
        flex items-center w-full gap-2 px-4 py-4 bg-white border-t lg:gap-4 font-notosans
      `}
    >
      <button onClick={() => fileInputRef.current?.click()}>
        <HiPhoto size={30} className='text-lime-500 flex-1 hover:text-lime-600 transition' />
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          accept='image/*'
        />
      </button>
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
