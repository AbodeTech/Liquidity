import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/lib/types/user/auth'

interface UserProfileState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserProfile = create<UserProfileState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-profile-storage',
    }
  )
)
