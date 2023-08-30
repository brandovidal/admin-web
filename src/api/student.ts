// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryId, QueryParams, Response } from '@/interfaces/common/Response'
import type { Student } from '@/interfaces/api/Student'

export const getStudents = async ({ page = 1, limit = 10 }: QueryParams): Promise<Response<Student>> => {
  const response = await axios.get<Response<Student>>(`${config.apiUrl}/students?page=${page}&limit=${limit}`)
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
  const studentId = student.id ?? ''
  delete student.id
  const response = await axios.put(`${config.apiUrl}/students/${studentId}`, student)
  return response.data
}

export const deleteStudent = async (student: Student): Promise<Student> => {
  const studentId = student.id ?? ''
  const response = await axios.delete(`${config.apiUrl}/students/${studentId}`)
  return response.data
}
