import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// interfaces
import type { Student } from '@/interfaces/api/Student'

interface StudentState {
  student: Student | null
  addStudent: (student: Student) => void
  cleanStudent: () => void
}

export const useStudentStore = create(
  persist<StudentState>(
    set => ({
      student: null,
      addStudent: student => {
        set(() => ({ student }))
      },
      cleanStudent: () => {
        set({ student: null })
      }
    }),
    {
      name: 'student'
    }
  )
)
