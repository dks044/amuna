'use client';

import { AuthFormValues } from '@/types/types';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface TextAreaProps {
  label?: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  register,
  required,
  errors,
  disabled,
  rows = 3, // 기본 값으로 4행 설정
  maxLength,
  defaultValue,
}) => {
  const [currentLength, setCurrentLength] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (maxLength && value.length > maxLength) {
      // 글자 수가 초과할 경우 마지막 두 글자를 지우기
      const newValue = value.slice(0, maxLength - 2);
      event.target.value = newValue;
      setCurrentLength(newValue.length);
      toast.error(maxLength + '글자를 초과했어요!');
    } else {
      setCurrentLength(value.length);
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
          {label}
        </label>
      )}
      <div className='mt-2'>
        <textarea
          id={id}
          rows={rows}
          defaultValue={defaultValue}
          disabled={disabled}
          {...register(id, { required })}
          onChange={handleChange}
          className={clsx(
            `
            form-textarea
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5
            px-1
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-orange-600 
            sm:text-sm 
            sm:leading-6`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default',
          )}
        />
      </div>
      {maxLength && (
        <div className='mt-1 text-sm text-gray-600'>
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default TextArea;
