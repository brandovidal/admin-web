import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// interfaces
import type { Program } from '@/interfaces/api/Program'

interface ProgramState {
  program: Program | null
  addProgram: (program: Program) => void
  cleanProgram: () => void
}

export const useProgramStore = create(
  persist<ProgramState>(
    set => ({
      program: null,
      addProgram: program => {
        set(() => ({ program }))
      },
      cleanProgram: () => {
        set({ program: null })
      }
    }),
    {
      name: 'program'
    }
  )
)
