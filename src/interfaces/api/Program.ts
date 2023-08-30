import type { ReactElement } from 'react'

export type ProgramStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Program {
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
export interface ProgramData {
  name: string
  course?: string
  startDate?: string | null
  endDate?: string | null
  total?: number | null
  actions?: ReactElement | null
}
