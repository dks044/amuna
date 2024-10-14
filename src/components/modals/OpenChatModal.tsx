'use client';
import React, { useRef, useState } from 'react';
import Modal from './Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import Input from '../inputs/Input';
import Image from 'next/image';
import Button from '../Button';
import TextArea from '../inputs/TextArea';
import SearchSkillBar from '../SearchSkillBar';
import SkillIcon from '../SkillIcon';
import { TiDelete } from 'react-icons/ti';
import { TechStack } from '@/types/types';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface OpenChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const OpenChatModal = ({ isOpen, onClose, currentUser }: OpenChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<TechStack[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      image: null,
      isGroup: true,
      createdBy: currentUser.id,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    const uploadedImageUrl = await handleUpload();

    const requestData = {
      ...data,
      skills,
      image: uploadedImageUrl || null,
    };

    try {
      await axios.post(`/api/conversations/group`, requestData);
      onClose();
      router.push('/chatrooms');
    } catch (error) {
      toast.error('에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const onClickToSetSkills = (skill: TechStack) => {
    setSkills(prevSkills => {
      if (!prevSkills.includes(skill)) {
        return [...prevSkills, skill];
      }
      return prevSkills;
    });
  };

  const onClickToRemoveSkills = (skill: TechStack) => {
    setSkills(prevSkills => {
      const updateSkills = prevSkills.filter(prevSkill => prevSkill !== skill);
      return updateSkills;
    });
  };

  const handleUpload = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file!);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET!);
    formData.append(
      'folder',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_CHATROOM_IMAGE_FOLDER_NAME!,
    );

    try {
      const response = await axios.post(`/api/cloudinary`, formData);
      return response.data.uploadedImageData.secure_url;
    } catch (error) {
      console.log(error);
      toast.error('에러가 발생했습니다.');
      return null;
    }
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

      // 파일 크기 검사 (1MB)
      if (file.size > 1 * 1024 * 1024) {
        toast.error('1MB 미만으로 올려주세요');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex-1 h-100'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-12'>
            <div className='pb-12 border-b border-gray-900/10'>
              <h2 className='text-base font-semibold leading-7 text-gray-900 '>
                관심사 채팅방 생성
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>
                관심사 오픈 채팅방을 생성하세요.
              </p>

              <div className='flex flex-col mt-10 gap-y-8'>
                <TextArea
                  label='이름'
                  id='name'
                  register={register}
                  required
                  errors={errors}
                  disabled={isLoading}
                  maxLength={20}
                  defaultValue={currentUser.introduce!}
                  rows={2}
                />
                <div>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium leading-6 text-gray-900 '
                  >
                    채팅방 사진
                  </label>
                  <div className='flex items-center mt-2'>
                    <Image
                      width='48'
                      height='48'
                      className='rounded-full'
                      src={imagePreview || '/images/placeholder.jpg'}
                      alt='Avatar'
                    />
                    <Button
                      disbaled={isLoading}
                      secondary
                      type='button'
                      onClick={() => fileInputRef.current?.click()}
                    >
                      변경하기
                    </Button>
                    <input
                      id='image'
                      type='file'
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className='hidden'
                      accept='image/*'
                    />
                  </div>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium leading-6 text-gray-900 mt-7 mb-2'
                  >
                    관심사 태그
                  </label>
                  <SearchSkillBar onClickSkillItem={onClickToSetSkills} />
                  <div className='flex flex-wrap space-x-3'>
                    {Array.from(skills).map(skill => (
                      <div className='flex items-center' key={skill}>
                        <SkillIcon skill={skill} />
                        <span onClick={() => onClickToRemoveSkills(skill)}>
                          <TiDelete
                            className={clsx(
                              `
                          text-gray-500
                          hover:text-gray-300
                          cursor-pointer
                        `,
                            )}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
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

export default OpenChatModal;
