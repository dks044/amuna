'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import toast from 'react-hot-toast';
import Input from '@/components/inputs/Input';
import Button from '@/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { AuthFormValues } from '@/types/types';
import Select from '@/components/inputs/Select';
import LoadingModal from '@/components/modals/LoadingModal';

type Variant = 'LOGIN' | 'REGISTER';
type Gender = 'MAN' | 'WOMEN' | 'OTHER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, , router]);

  const toggleVariant = () => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      gender: 'other',
    },
  });

  const onSubmit: SubmitHandler<AuthFormValues> = data => {
    setIsLoading(true);
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', { ...data, redirect: false }))
        .then(callback => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }
          if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .catch(() => {
          console.log(errors);
          toast.error('에러가 발생했습니다.');
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false })
        .then(callback => {
          if (callback?.error) {
            toast.error('인증에 실패했습니다.');
          }
          if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then(callback => {
        if (callback?.error) {
          toast.error('인증에 실패했습니다.');
        }
        if (callback?.ok) {
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const selectItems = [
    { label: '남성', value: 'MAN' },
    { label: '여성', value: 'WOMEN' },
    { label: '기타', value: 'OTHER' },
  ];

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-4 bg-white shadow-lg sm:rounded-lg sm:px-10'>
        <div className='text-2xl text-center w-full font-semibold'>
          {variant === 'REGISTER' ? '회원가입' : '로그인'}
        </div>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id='name'
              label='이름'
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='email'
            label='이메일'
            type='email'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='password'
            label='비밀번호'
            type='password'
          />
          {variant === 'REGISTER' && (
            <Select
              label='성별'
              id='gender'
              disabled={isLoading}
              selectItems={selectItems}
              register={register}
              errors={errors}
              required
            />
          )}
          <div>
            <Button disbaled={isLoading} fullWidth type='submit'>
              {variant === 'LOGIN' ? '로그인' : '회원가입'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center '>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500 bg-white'>소셜 로그인</span>
            </div>
          </div>
          <div className='flex gap-2 mt-6'>
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>
        <div className='flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500 '>
          <div>{variant === 'LOGIN' ? 'AMUNA를 처음 사용하시나요?' : '이미 계정이 있나요?'}</div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? '계정 만들기' : '로그인하기'}
          </div>
        </div>
      </div>
      <LoadingModal show={isLoading} />
    </div>
  );
};

export default AuthForm;
