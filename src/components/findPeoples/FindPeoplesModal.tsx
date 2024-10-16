'use client';
import React, { useState } from 'react';
import Modal from '../modals/Modal';
import { TiDelete } from 'react-icons/ti';
import SkillIcon from '../SkillIcon';
import clsx from 'clsx';
import { TechStack } from '@/types/types';
import { FieldValues, useForm } from 'react-hook-form';
import SearchSkillBar from '../SearchSkillBar';
import Button from '../Button';
import { DialogTitle } from '@headlessui/react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserStore from '@/store/useUserStore';
import { User } from '@prisma/client';
import LoadingModal from '../modals/LoadingModal';

interface FindPeoplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindPeoplesModal = ({ isOpen, onClose }: FindPeoplesModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<TechStack[]>([]);
  const { addUser } = useUserStore();

  const onClickToSetSkills = (skill: TechStack) => {
    setSkills(prevSkills => (prevSkills.includes(skill) ? prevSkills : [...prevSkills, skill]));
  };

  const onClickToRemoveSkills = (skill: TechStack) => {
    setSkills(prevSkills => prevSkills.filter(prevSkill => prevSkill !== skill));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      tags: [],
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const requestData = {
      tags: skills,
    };
    try {
      const response = await axios.get<User[]>('/api/user', { params: requestData });
      if (response.data.length === 0) {
        toast('관심사랑 같은 사람을 찾지 못했어요.');
      } else {
        toast('관심사랑 비슷한 사람을 찾았어요.');
        response.data.forEach(user => {
          addUser(user);
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingModal show={isLoading} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className='flex-1 h-100'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-12'>
              <div className='pb-12 border-b border-gray-900/10'>
                <div className='sm:flex sm:items-start'>
                  <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-lime-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                    <FaSearch className='w-6 h-6 text-lime-500 ' />
                  </div>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <DialogTitle
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900'
                    >
                      관심사 비슷한 사람 찾기
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>나랑 관심사가 비슷한 사람을 찾아요.</p>
                    </div>
                  </div>
                </div>

                <label
                  htmlFor='photo'
                  className='block text-sm font-medium leading-6 text-gray-900 mt-7 mb-2'
                >
                  관심사 태그
                </label>
                <SearchSkillBar onClickSkillItem={onClickToSetSkills} />
                <div className='flex flex-wrap space-x-3'>
                  {skills.map(skill => (
                    <div className='flex items-center' key={skill}>
                      <SkillIcon skill={skill} />
                      <span onClick={() => onClickToRemoveSkills(skill)}>
                        <TiDelete
                          className={clsx('text-gray-500 hover:text-gray-300 cursor-pointer')}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex items-center justify-end mt-6 gap-x-6'>
              <Button disbaled={isLoading} secondary onClick={onClose}>
                취소
              </Button>
              <Button disbaled={isLoading} type='submit'>
                검색
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FindPeoplesModal;
