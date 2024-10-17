'use client';
import getUsers from '@/app/actions/getUsers';
import IconButton from '@/components/IconButton';
import OpenChatModal from '@/components/modals/OpenChatModal';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { FaBook } from 'react-icons/fa';
import FindPeoplesButton from '@/components/findPeoples/FindPeoplesButton';
import FindPeoplesModal from '@/components/findPeoples/FindPeoplesModal';
import useUserStore from '@/store/useUserStore';
import UserBox from '@/components/users/UserBox';
import MobileNavigation from './MobileNavigation';

interface DesktopSideMenuProps {
  currentUser: User;
}
const DesktopSideMenu = ({ currentUser }: DesktopSideMenuProps) => {
  const [isModealOpen, setIsModealOpen] = useState(false); //오픈챗모달
  const [isFindModal, setIsFindModal] = useState(false);
  const { users } = useUserStore();
  return (
    <>
      <OpenChatModal
        currentUser={currentUser}
        isOpen={isModealOpen}
        onClose={() => setIsModealOpen(false)}
      />
      <FindPeoplesModal isOpen={isFindModal} onClose={() => setIsFindModal(false)} />
      <MobileNavigation user={currentUser} />
      <div
        className={`
      fixed
      inset-y-0
      left-0
      lg:left-20
      hidden
      lg:block
      h-full
      bg-white
      lg:w-80
      flex-col
      pt-6
      border-r-[1px]
    `}
      >
        <div
          className={`
        flex
        justify-center
        items-center
        w-full
      `}
        >
          <div className='text-2xl font-bold text-neutral-800'>AMUNA</div>
          <div
            className='w-7 h-7 bg-transparent absolute right-3'
            onClick={() => setIsModealOpen(true)}
          >
            <IconButton icon={MdOutlineGroupAdd} />
          </div>
        </div>
        <div className='mt-2 px-2'>
          <FindPeoplesButton onClick={() => setIsFindModal(true)} />
        </div>
        <div className='mt-2 px-2 overflow-y-auto' style={{ maxHeight: 'calc(100% - 160px)' }}>
          {users.map(user => (
            <UserBox data={user} key={user.id} />
          ))}
        </div>
        {/* 배너 */}
        <div
          className='absolute bottom-20 flex h-20 bg-[#03c75a] w-full justify-center transition hover:bg-[#16BD61] cursor-pointer'
          onClick={() => {
            window.open('https://blog.naver.com/buzz7811', '_blank');
          }}
        >
          <div className='flex flex-col justify-center items-center'>
            <div>
              <FaBook className='text-white ' size={30} />
            </div>
            <div className='text-white'>개발자 기술블로그</div>
          </div>
        </div>
        <div
          className='absolute bottom-0 flex h-20 bg-black w-full justify-center transition hover:bg-gray-900 cursor-pointer'
          onClick={() => {
            window.open('https://github.com/dks044', '_blank');
          }}
        >
          <div className='flex flex-col justify-center items-center'>
            <div>
              <BsGithub className='text-white ' size={30} />
            </div>
            <div className='text-white'>개발자 GITHUB</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopSideMenu;
