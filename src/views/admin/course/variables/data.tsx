// interfaces
import type { Course, CourseData } from '@/interfaces/api/Course'

import { formatDate } from '@/utils/date'
import { generateActions } from '@/utils/page'

export const formatData = (data: Course[] = [], handleEdit: (course: Course) => void, handleDelete: (course: Course) => void): CourseData[] => {
  return data.map((course) => {
    const { name, code, uniqueProgram, createdAt } = course

    const date = formatDate(createdAt)

    const handleEditClick = () => {
      handleEdit(course)
    }
    const handleDeleteClick = () => {
      handleDelete(course)
    }

    const actions = generateActions(handleEditClick, handleDeleteClick)

    return { name, code, uniqueProgram, date, actions }
  })
}
