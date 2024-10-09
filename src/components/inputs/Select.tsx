import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import clsx from 'clsx';

type SelectItem = {
  label: string;
  value: string;
};

interface SelectProps {
  label: string; // 레이블
  id: string; // id
  selectItems: SelectItem[]; // 선택 항목
  register: UseFormRegister<any>; // react-hook-form의 register
  errors: FieldErrors; // 오류 상태
  required?: boolean; // 필수 여부
  disabled?: boolean; // 비활성화 여부
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  selectItems,
  register,
  errors,
  required,
  disabled,
}) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <select
        id={id}
        {...register(id, { required })}
        defaultValue=''
        disabled={disabled}
        className={clsx(
          `
          
          block 
          w-full 
          mt-1 
          border 
          border-gray-300 
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-orange-500 
          focus:border-orange-500 
          disabled:opacity-50 
          disabled:cursor-not-allowed 
          p-2
          
        
          `,
          errors[id] && 'focus:ring-rose-500',
          disabled && 'opacity-50 cursor-default',
        )}
      >
        <option value='' disabled>
          선택하세요
        </option>
        {selectItems.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
