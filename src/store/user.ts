import type { User } from '@/interfaces/User'
import create from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  addUser: (user: User) => void
  removeUser: () => void
}

export const useUserStore = create(
  persist<UserState>(
    set => ({
      user: null,
      addUser: user => {
        set(() => ({ user }))
      },
      removeUser: () => {
        set({ user: null })
      }
    }),
    {
      name: 'user'
    }
  )
)
