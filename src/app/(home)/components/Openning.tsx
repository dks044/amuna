'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RiScrollToBottomLine } from 'react-icons/ri';

const Opening = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen w-full'>
      <motion.div
        className='text-6xl font-bold text-center text-gray-900'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        AMUNA
      </motion.div>
      <motion.div
        className='mt-4'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <RiScrollToBottomLine size={40} className='text-gray-900 animate-bounce' />
      </motion.div>
      <motion.div
        className={`mt-10 text-2xl text-gray-900 transition-opacity duration-500 ${scrolling ? 'opacity-100' : 'opacity-0'}`}
      >
        관심사랑 맞는사람과 즐겁게 대화하세요
      </motion.div>
      <motion.div
        className={`mt-10 text-2xl text-gray-900 transition-opacity duration-500 ${scrolling ? 'opacity-100' : 'opacity-0'}`}
      >
        그럼 즐겨주세요!
      </motion.div>
    </div>
  );
};

export default Opening;
