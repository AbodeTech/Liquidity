import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Admin } from '@/lib/types/admin/auth'

interface AdminProfileState {
  admin: Admin | null
  setAdmin: (admin: Admin) => void
  clearAdmin: () => void
}

export const useAdminProfile = create<AdminProfileState>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin }),
      clearAdmin: () => set({ admin: null }),
    }),
    {
      name: 'admin-profile-storage',
    }
  )
)
