import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthContext } from '../types'

export const useAuthStore = create<AuthContext>()(
  persist(
    (set) => ({
      user: null,
      isAuthorized: false,
      isAdmin: false,
      reset: () =>
        set(() => ({
          user: null,
          isAuthorized: false,
          isAdmin: false,
        })),
      setUser: (user) =>
        set(() => ({
          user,
          isAuthorized: !!user,
          isAdmin: user?.role === 'admin',
        })),
    }),
    {
      name: 'auth-store',
    }
  )
)
