'use client';
import axios from 'axios';
import toast from 'react-hot-toast';

const useLogout = async () => {
  try {
    //userId를 redis에서 제거
    await axios.post('/api/user_disconnected');
  } catch (error) {
    toast.error('로그아웃중에 에러가 발생했어요.');
  }
};

export default useLogout;
