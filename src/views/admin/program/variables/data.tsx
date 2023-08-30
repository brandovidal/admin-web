// interfaces
import type { Program, ProgramData } from '@/interfaces/api/Program'

import { NO_OP } from '@/constants/default'

import { formatDate } from '@/utils/date'
import { formatNumber } from '@/utils/number'
import { generateActions } from '@/utils/page'

export const formatData = (data: Program[] = [], handleEditClick = NO_OP, handleDeleteClick = NO_OP): ProgramData[] => {
  return data.map((program) => {
    const { name, total, startDate, endDate } = program

    const totalFormatted = formatNumber(total)
    const startDateFormatted = formatDate(startDate)
    const endDateFormatted = formatDate(endDate)

    const actions = generateActions(handleEditClick, handleDeleteClick)

    return { name, total: totalFormatted, startDate: startDateFormatted, endDate: endDateFormatted, actions }
  })
}
