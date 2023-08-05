// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryId, QueryParams, Response } from '@/interfaces/common/Response'
import type { Student } from '@/interfaces/api/Student'

export const getStudents = async ({ page = 1, limit = 10, revalidate = true }: QueryParams): Promise<Response<Student>> => {
  const response = await axios.get<Response<Student>>(`${config.apiUrl}/students?page=${page}&limit=${limit}&revalidate=${String(revalidate)}`)
  return response.data
}

export const getStudentId = async ({ id }: QueryId): Promise<Student> => {
  const response = await axios.get<Student>(`${config.apiUrl}/students/${id}`)
  return response.data
}

export const postStudent = async (student: Student): Promise<Student> => {
  const response = await axios.post(`${config.apiUrl}/students`, student)
  return response.data
}

export const updateStudent = async (student: Student): Promise<Student> => {
  const userId = student.id ?? ''
  delete student.id
  const response = await axios.put(`${config.apiUrl}/students/${userId}`, student)
  return response.data
}

export const deleteStudent = async (student: Student): Promise<Student> => {
  const userId = student.id ?? ''
  const response = await axios.delete(`${config.apiUrl}/students/${userId}`)
  return response.data
}
