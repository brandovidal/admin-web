import {create} from 'zustand'
import { persist } from 'zustand/middleware'

// interfaces
import type { User } from '@/interfaces/User'

interface UserState {
  user: User | null
  addUser: (user: User) => void
  cleanUser: () => void
}

export const useUserStore = create(
  persist<UserState>(
    set => ({
      user: null,
      addUser: user => {
        set(() => ({ user }))
      },
      cleanUser: () => {
        set({ user: null })
      }
    }),
    {
      name: 'user'
    }
  )
)
