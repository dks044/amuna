'use client';

import React, { Fragment } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { ClipLoader } from 'react-spinners';

interface LoadingModalProps {
  show: boolean;
}

const LoadingModal = ({ show }: LoadingModalProps) => {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={() => {}}>
        <Transition
          show={show}
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 transition-opacity bg-gray-100 bg-opacity-50 ' />
        </Transition>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center '>
            <Transition
              show={show}
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <DialogPanel>
                <ClipLoader size={40} color='#84cc16' />
              </DialogPanel>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoadingModal;
