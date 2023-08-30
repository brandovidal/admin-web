// interfaces
import type { Program, ProgramData } from '@/interfaces/api/Program'

import { formatDate } from '@/utils/date'
import { formatNumber } from '@/utils/number'
import { generateActions } from '@/utils/page'

export const formatData = (data: Program[] = [], handleEdit: (program: Program) => void, handleDelete: (program: Program) => void): ProgramData[] => {
  return data.map((program) => {
    const { name, total, startDate, endDate } = program

    const totalFormatted = formatNumber(total)
    const startDateFormatted = formatDate(startDate)
    const endDateFormatted = formatDate(endDate)

    const handleEditClick = () => {
      handleEdit(program)
    }
    const handleDeleteClick = () => {
      handleDelete(program)
    }

    const actions = generateActions(handleEditClick, handleDeleteClick)

    return { name, total: totalFormatted, startDate: startDateFormatted, endDate: endDateFormatted, actions }
  })
}
