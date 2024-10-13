import Modal from '@/components/modals/Modal';
import Image from 'next/image';
import React from 'react';

interface ImageModelProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModel = ({ src, isOpen, onClose }: ImageModelProps) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-80 h-80'>
        <Image className='object-cover' fill alt='Image' src={src} />
      </div>
    </Modal>
  );
};

export default ImageModel;
