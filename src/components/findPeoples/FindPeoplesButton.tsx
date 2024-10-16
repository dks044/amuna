import React from 'react';

interface FindPeoplesButtonProps {
  onClick: () => void;
}

const FindPeoplesButton = ({ onClick }: FindPeoplesButtonProps) => {
  return (
    <div
      className='w-full rounded-full transition text-base text-white bg-lime-400 hover:bg-lime-500
    flex justify-center cursor-pointer'
      onClick={onClick}
    >
      <div>나랑 관심사 비슷한 사람 찾기</div>
    </div>
  );
};

export default FindPeoplesButton;
