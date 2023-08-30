import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// interfaces
import type { Course } from '@/interfaces/api/Course'

interface CourseState {
  course: Course | null
  addCourse: (course: Course) => void
  cleanCourse: () => void
}

export const useCourseStore = create(
  persist<CourseState>(
    set => ({
      course: null,
      addCourse: course => {
        set(() => ({ course }))
      },
      cleanCourse: () => {
        set({ course: null })
      }
    }),
    {
      name: 'course'
    }
  )
)
