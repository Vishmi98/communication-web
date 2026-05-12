import { create } from 'zustand'

import { UserStoreUserType } from '@/constants/types';


interface BearState {
  user: UserStoreUserType | undefined;
  addUser: (user: UserStoreUserType) => void;
  removeUser: () => void;
}

const userStore = create<BearState>((set) => ({
  user: undefined,
  addUser: (user: UserStoreUserType) => set(({ user: user })),
  removeUser: () => set({ user: undefined }),
}));

export default userStore;
