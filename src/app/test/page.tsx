import LoadingModal from '@/components/modals/LoadingModal';
import React from 'react';
import getUsers from '../actions/getUsers';
import UserBox from '@/components/users/UserBox';

const testPage = async () => {
  const users = await getUsers();

  return (
    <div className='flex-col w-full h-full grid-background'>
      <div className='flex w-full justify-center text-2xl font-semibold'>테스트 페이지</div>
      <div className='flex-col mt-6'>
        {users.map(item => (
          <UserBox data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default testPage;
