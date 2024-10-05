import EmptyState from '@/components/EmptyState';
import React from 'react';

const UserPage = () => {
  return (
    <div
      className={`
    hidden
    h-full
    lg:block

  `}
    >
      <EmptyState />
    </div>
  );
};

export default UserPage;
