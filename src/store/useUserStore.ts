// src/store/useUserStore.ts
import { create } from 'zustand';
import { TechStack } from '@/types/types';
import { User } from '@prisma/client';

interface UserStore {
  users: User[];
  addUser: (user: any) => void;
  clearUsers: () => void;
}

const useUserStore = create<UserStore>(set => ({
  users: [],
  addUser: user => set(state => ({ users: [...state.users, user] })),
  clearUsers: () => set({ users: [] }),
}));

export default useUserStore;
