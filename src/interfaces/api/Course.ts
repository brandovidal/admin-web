import type { ReactElement } from 'react'

import type { NumberFormatValues } from 'react-number-format'

export interface Course {
  id?: string
  name: string
  code: string
  uniqueProgram?: string | null
  startDate?: string | null
  endDate?: string | null
  amount?: number | NumberFormatValues | null
  discount?: number | NumberFormatValues | null
  total?: number | NumberFormatValues | null
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
