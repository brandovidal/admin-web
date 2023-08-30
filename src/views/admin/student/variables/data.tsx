// interfaces
import type { Student, StudentData } from '@/interfaces/api/Student'

import { formatDate } from '@/utils/date'
import { generateActions, generateStatus } from '@/utils/page'

export const formatData = (data: Student[] = [], handleEdit: (student: Student) => void, handleDelete: (student: Student) => void): StudentData[] => {
  return data.map((student) => {
    const { email, phone, dni, ruc, status = false, createdAt: date } = student

    const fullName = `${student?.name} ${student?.lastname}`
    const numberDocument = String(dni ?? ruc)
    const createdAt = formatDate(String(date))
    const statusFormatted = generateStatus(status as boolean)

    const handleEditClick = () => {
      handleEdit(student)
    }
    const handleDeleteClick = () => {
      handleDelete(student)
    }
    const actions = generateActions(handleEditClick, handleDeleteClick)

    return { fullName, email, phone, numberDocument, createdAt, status: statusFormatted, actions }
  })
}
