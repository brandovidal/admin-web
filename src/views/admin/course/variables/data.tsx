// interfaces
import type { Course, CourseData } from '@/interfaces/api/Course'

import { formatDate } from '@/utils/date'
import { formatNumber } from '@/utils/number'
import { generateActions } from '@/utils/page'

export const formatData = (data: Course[] = [], handleEdit: (course: Course) => void, handleDelete: (course: Course) => void): CourseData[] => {
  return data.map((course) => {
    const { name, total, startDate, endDate } = course

    const totalFormatted = formatNumber(total)
    const startDateFormatted = formatDate(startDate)
    const endDateFormatted = formatDate(endDate)

    const handleEditClick = () => {
      handleEdit(course)
    }
    const handleDeleteClick = () => {
      handleDelete(course)
    }

    const actions = generateActions(handleEditClick, handleDeleteClick)

    return { name, total: totalFormatted, startDate: startDateFormatted, endDate: endDateFormatted, actions }
  })
}
