'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user_id: string | null;
  name: string | null;
  email: string | null;
  picture: string | null;
  hasHydrated: boolean;
  setUser: (user: { user_id: string; email: string; name: string; picture: string }) => void;
  clearUser: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user_id: null,
      name: null,
      email: null,
      picture: null,
      hasHydrated: false,
      setUser: (user) =>
        set(() => ({
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        })),
      clearUser: () =>
        set(() => ({
          user_id: null,
          name: null,
          email: null,
          picture: null,
        })),
        setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: 'auth-user', // key in storage
      storage: createJSONStorage(() => sessionStorage), 
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
