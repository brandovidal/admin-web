import type { ReactElement } from 'react'

export type StudentStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Student {
  id?: string
  name: string
  lastname: string
  birthday?: string | null
  dni?: number | null
  email: string
  ruc?: number | null
  businessName?: string | null
  address?: string | null
  country?: object | string | null
  phoneCode?: string | null
  phone?: number | string | null
  phoneWithFormat?: string | null
  ladline?: number | null
  ladlineWithFormat?: string | null
  postgraduateTraining?: boolean | null
  graduateTraining?: boolean | null
  bachelorTraining?: boolean | null
  studentTraining?: boolean | null
  studyCenter?: string | null
  workplace?: string | null
  workPosition?: string | null
  workAddress?: string | null
  status?: StudentStatusEnumType | object | string | boolean | null
  createdAt?: string
  updatedAt?: string
}
export interface StudentData {
  fullName: string
  phone?: number | null
  numberDocument?: number | string
  createdAt: string | null
  status: StudentStatusEnumType | ReactElement | null
  actions?: ReactElement | null
}
