'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { User } from '@prisma/client';
import Avatar from '@/components/Avatar';
import SettingModal from '@/components/sidebar/SettingModal';

interface MobileNavigationProps {
  user: User;
}

const MobileNavigation = ({ user }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <SettingModal
        currentUser={user}
        isOpen={isSettingModal}
        onClose={() => setIsSettingModal(false)}
      />
      <div className='fixed bottom-20 right-10 lg:hidden'>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} // 초기 위치 및 투명도
            animate={{ opacity: 1, y: -5 }} // 나타날 때
            exit={{ opacity: 0, y: 20 }} // 사라질 때 위로
            transition={{
              type: 'spring', // 스프링 애니메이션
              stiffness: 500, // 강도
              damping: 30, // 감쇠
            }}
            className='rounded-full'
            onClick={() => setIsSettingModal(true)}
          >
            <Avatar user={user} settingModal notVisibleActive isMobile />
          </motion.div>
        )}

        <motion.button
          onClick={handleToggle}
          className='bg-lime-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg '
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? -15 : 0 }} // 버튼 기울어짐
          transition={{ duration: 0.2 }} // 애니메이션 지속 시간
        >
          <span className='text-white text-2xl'>+</span>
        </motion.button>
      </div>
    </>
  );
};

export default MobileNavigation;
