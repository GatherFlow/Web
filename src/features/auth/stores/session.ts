import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ResetSessionContext } from '../types'

export const useResetSessionStore = create<ResetSessionContext>()(
  persist(
    (set) => ({
      session: null,
      reset: () =>
        set(() => ({
          session: null,
        })),
      setSession: (session) =>
        set(() => ({
          session
        })),
      setVerified: () =>
        set(({ session }) => ({
          session: {
            ...session!,
            isEmailVerified: true,
          },
        }))
    }),
    {
      name: 'reset-session-store',
    }
  )
)
