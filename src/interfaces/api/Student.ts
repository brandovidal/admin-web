import type { NextRouter } from 'next/router'
import type { ReactElement } from 'react'

// interfaces
import type { AlertProps } from '../common/Alert'
import type { TableProps } from '../common/Table'

export type StudentStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Student {
  id?: string
  fullName?: string
  name: string
  lastname: string
  birthday?: string | null
  dni: number
  email: string
  ruc?: number | null
  businessName?: string | null
  address?: string | null
  country?: string | null
  phone?: number | null
  phoneWithFormat?: string | null
  ladline?: number | null
  ladlineWithFormat?: string | null
  postgradoTraining?: boolean | null
  qualifiedTraining?: boolean | null
  highSchoolTraining?: boolean | null
  studentTraining?: boolean | null
  studyCenter?: string | null
  workplace?: string | null
  workPosition?: string | null
  workAddress?: string | null
  status?: StudentStatusEnumType
  createdAt: string
  updatedAt: string
}
export interface StudentData {
  fullName: string
  phone?: number | null
  numberDocument: number
  createdAt?: string
  status?: StudentStatusEnumType | ReactElement
  actions?: ReactElement | null
}

export interface StudentViewProps extends TableProps {
  handleAdd: () => void
  handleRefresh: () => void
}

export interface StudentAddProps {
  router?: NextRouter
  control: any
  alert?: AlertProps
  disabled: boolean
  onSubmit: React.FormEventHandler
  onCancel: () => void
}
export interface StudentEditProps extends StudentAddProps {}
