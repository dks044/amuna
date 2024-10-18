'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import toast from 'react-hot-toast';
import Input from '@/components/inputs/Input';
import Button from '@/components/Button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { AuthFormValues, TechStack } from '@/types/types';
import Select from '@/components/inputs/Select';
import LoadingModal from '@/components/modals/LoadingModal';
import SearchSkillBar from '@/components/SearchSkillBar';
import SkillIcon from '@/components/SkillIcon';
import { TiDelete } from 'react-icons/ti';
import clsx from 'clsx';
import { ClipLoader } from 'react-spinners';
import generateRandomCode from '@/app/utils/randomCode';

type Variant = 'LOGIN' | 'REGISTER';
type Gender = 'MAN' | 'WOMEN' | 'OTHER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skills, setSkills] = useState<TechStack[]>([]);
  //이메일 인증 관련
  const [mailCode, setMailCode] = useState('');
  const [timer, setTimer] = useState(180); // 5분 = 300초
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);

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
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      gender: 'other',
      code: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);
    const { name, email, password, gender, code } = data;

    const userSkills = [...skills];

    if (variant === 'REGISTER') {
      if (!gender) {
        toast.error('성별을 선택해주세요.');
        setIsLoading(false);
        return;
      }

      try {
        // 이메일 인증 검증 요청
        await axios.get(
          `/api/auth/mailvalidate?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
        );

        // 인증 성공 후 회원가입 요청
        await axios.post('/api/register', {
          name,
          email,
          password,
          gender,
          skills: userSkills,
          code,
        });

        const callback = await signIn('credentials', { email, password, redirect: false });
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }
        if (callback?.ok) {
          toast.success('회원가입 성공! 잠시만 기다려주세요!');
          router.push('/conversations');
        }
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          // 상태 코드가 400일 때
          if (axiosError.response.status === 400) {
            toast.error('인증코드 오류입니다, 메일을 확인해주세요.');
          } else {
            toast.error('에러가 발생했습니다.');
          }
        } else {
          toast.error('네트워크 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
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

  // 이메일 인증 관련
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      setMailCode(generateRandomCode());
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setMailCode('');
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const onClickForEmailCode = () => {
    setIsSendLoading(true);
    const generatedCode = generateRandomCode();
    setMailCode(generatedCode);

    const email = getValues('email');
    if (email === '' || !email) {
      toast.error('이메일을 적어주세요.');
      setIsSendLoading(false);
      return;
    }
    axios
      .post('/api/sendmail', {
        email: email,
        code: generatedCode,
      })
      .then(() => toast('인증코드를 메일로 보냈어요.'))
      .catch(() => toast.error('메일을 보낸지 3분이 지나지 않았거나, 전송 오류에요.'))
      .finally(() => {
        setIsSendLoading(false);
        setIsTimerActive(true);
        setTimer(180);
      });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='border-0 ring-1 ring-inset ring-gray-300 px-4 py-4 bg-white shadow-lg sm:rounded-lg sm:px-10'>
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
              placeholder='이름 입력'
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='email'
            label='이메일'
            placeholder='이메일 입력'
          />
          {/* 이메일인증 회원가입 기능 부분 */}
          {variant === 'REGISTER' && (
            <div className='mt-0'>
              <Button fullWidth onClick={onClickForEmailCode}>
                {isSendLoading ? (
                  <ClipLoader color='white' size={30} />
                ) : (
                  <>이메일 인증코드 보내기</>
                )}
              </Button>
              <div className='relative'>
                <Input
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  placeholder='이메일 인증코드 입력'
                  id='code'
                />
                <div className='absolute bottom-0 right-1 text-gray-300'>
                  남은시간 {formatTime(timer)}
                </div>
              </div>
            </div>
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='password'
            label='비밀번호'
            type='password'
            placeholder='비밀번호 입력'
          />
          {variant === 'REGISTER' && (
            <React.Fragment>
              <Select
                label='성별'
                id='gender'
                disabled={isLoading}
                selectItems={selectItems}
                register={register}
                errors={errors}
                required
              />
              <SearchSkillBar onClickSkillItem={onClickToSetSkills} label='관심사 태그' />
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
            </React.Fragment>
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
