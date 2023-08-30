import type { ReactElement } from 'react'

export type ProgramStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Program {
  id?: string
  name: string
  lastname: string
  birthday?: string | null
  dni?: string | number | null
  email: string
  ruc?: number | null
  businessName?: string | null
  address?: string | null
  country?: object | string | null
  phoneCode?: string | null
  phone?: number | null
  phoneWithFormat?: string | null
  ladline?: number | null
  ladlineWithFormat?: string | null
  postgraduateTraining?: boolean | null
  graduateTraining?: boolean | null
  bachelorTraining?: boolean | null
  programTraining?: boolean | null
  studyCenter?: string | null
  workplace?: string | null
  workPosition?: string | null
  workAddress?: string | null
  status?: boolean | null
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
