'use client';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingModal = ({ isOpen, onClose, currentUser }: SettingModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  return <div>SettingModal</div>;
};

export default SettingModal;
