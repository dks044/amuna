'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
      introduce: currentUser.introduce,
    },
  });
  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    axios
      .post(`/api/settings`, data)
      .then(() => {
        onClose();
        window.location.reload();
      })
      .catch(() => toast.error('에러가 발생했습니다.'))
      .finally(() => setIsLoading(false));
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
                      src={image || currentUser?.image || '/images/placeholder.jpg'}
                      alt='Avatar'
                    />
                    <Button disbaled={isLoading} secondary type='button'>
                      변경하기
                    </Button>
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
