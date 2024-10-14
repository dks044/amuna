'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../modals/Modal';
import Button from '../Button';
import Image from 'next/image';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import SearchSkillBar from '../SearchSkillBar';
import { TechStack } from '@/types/types';
import SkillIcon from '../SkillIcon';
import { TiDelete } from 'react-icons/ti';
import clsx from 'clsx';

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingModal = ({ isOpen, onClose, currentUser }: SettingModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<TechStack[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cloudInaryResponse, setCloudInaryResponse] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
      introduce: currentUser.introduce,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);

    const uploadedImageUrl = await handleUpload();

    const requestData = {
      ...data,
      skills,
      image: uploadedImageUrl || currentUser.image,
    };

    try {
      await axios.post(`/api/settings`, requestData);
      onClose();
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
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file!);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET!);
    formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_USER_IMAGE_FOLDER_NAME!);

    try {
      const response = await axios.post(`/api/cloudinary`, formData);
      console.log(response.data);
      return response.data.uploadedImageData.secure_url;
    } catch (error) {
      console.log(error);
      toast.error('에러가 발생했습니다.');
      return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const currentUserSkills = currentUser.tags as TechStack[];
      setSkills(currentUserSkills);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex-1 h-100'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-12'>
            <div className='pb-12 border-b border-gray-900/10'>
              <h2 className='text-base font-semibold leading-7 text-gray-900 '>프로필</h2>
              <p className='mt-1 text-sm leading-6 text-gray-600'>프로필을 수정하세요.</p>

              <div className='flex flex-col mt-10 gap-y-8'>
                <Input
                  disabled={isLoading}
                  label='이름'
                  id='name'
                  errors={errors}
                  required
                  register={register}
                  defaultValue={currentUser.name!}
                />
                <div>
                  <label
                    htmlFor='photo'
                    className='block text-sm font-medium leading-6 text-gray-900 '
                  >
                    프로필 사진
                  </label>
                  <div className='flex items-center mt-2'>
                    <Image
                      width='48'
                      height='48'
                      className='rounded-full'
                      src={imagePreview || currentUser?.image || '/images/placeholder.jpg'}
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
                    className='block text-sm font-medium leading-6 text-gray-900 mt-7'
                  >
                    소개글
                  </label>
                  <TextArea
                    id='introduce'
                    register={register}
                    required
                    errors={errors}
                    disabled={isLoading}
                    maxLength={50}
                    defaultValue={currentUser.introduce!}
                  />
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

export default SettingModal;
