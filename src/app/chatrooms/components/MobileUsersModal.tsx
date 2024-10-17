import Button from '@/components/Button';
import Modal from '@/components/modals/Modal';
import UserBox from '@/components/users/UserBox';
import useUserStore from '@/store/useUserStore';
import React from 'react';

interface MobileUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileUsersModal = ({ isOpen, onClose }: MobileUsersModalProps) => {
  const { users } = useUserStore();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>검색한 관심사랑 비슷한 사용자</div>
      <div className='mt-2 px-2 overflow-y-auto' style={{ maxHeight: 'calc(100% - 160px)' }}>
        {users.map(user => (
          <UserBox data={user} key={user.id} />
        ))}
      </div>
      <div className='flex items-center justify-end mt-6 gap-x-6'>
        <Button secondary onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default MobileUsersModal;
