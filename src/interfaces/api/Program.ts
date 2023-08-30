import type { ReactElement } from 'react'

export type ProgramStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Program {
  id?: string
  name: string
  code: string
  startDate?: Date | string | null
  endDate?: Date | string | null
  amount?: number | null
  discount?: number | null
  total?: number | null
  observations?: string | null
  createdAt?: string
  updatedAt?: string
}
export interface ProgramData {
  fullName: string
  phone?: number | string | null
  numberDocument?: number | string
  createdAt: string | null
  status: ProgramStatusEnumType | ReactElement | null
  actions?: ReactElement | null
}
