// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryId, QueryParams, Response } from '@/interfaces/common/Response'
import type { Course } from '@/interfaces/api/Course'

export const getCourses = async ({ page = 1, limit = 10 }: QueryParams): Promise<Response<Course>> => {
  const response = await axios.get<Response<Course>>(`${config.apiUrl}/courses?page=${page}&limit=${limit}`)
  return response.data
}

export const getCourseId = async ({ id }: QueryId): Promise<Course> => {
  const response = await axios.get<Course>(`${config.apiUrl}/courses/${id}`)
  return response.data
}

export const postCourse = async (course: Course): Promise<Course> => {
  const response = await axios.post(`${config.apiUrl}/courses`, course)
  return response.data
}

export const updateCourse = async (course: Course): Promise<Course> => {
  const courseId = course.id ?? ''
  delete course.id
  const response = await axios.put(`${config.apiUrl}/courses/${courseId}`, course)
  return response.data
}

export const deleteCourse = async (course: Course): Promise<Course> => {
  const courseId = course.id ?? ''
  const response = await axios.delete(`${config.apiUrl}/courses/${courseId}`)
  return response.data
}
