import type { ReactElement } from 'react'

export type CourseStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Course {
  id?: string
  name: string
  code: string
  courseId?: string | null
  startDate?: string | null
  endDate?: string | null
  amount?: number | null
  discount?: number | null
  total?: number | null
  observations?: string | null
  status?: boolean | null
  createdAt?: string
  updatedAt?: string
}
export interface CourseData {
  name: string
  course?: string
  startDate?: string | null
  endDate?: string | null
  total?: string | null
  actions?: ReactElement | null
}
