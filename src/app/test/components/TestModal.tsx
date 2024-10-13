'use client';
import Modal from '@/components/modals/Modal';
import React from 'react';

const TestModal = () => {
  const handleClose = () => {
    return false;
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div>테스트모달</div>
    </Modal>
  );
};

export default TestModal;
