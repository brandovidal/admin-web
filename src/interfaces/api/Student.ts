import type { NextRouter } from 'next/router'

// interfaces
import type { AlertProps } from '../common/Alert'
import type { DataResponse } from '../common/Response'
import type { TableProps } from '../common/Table'

export type RoleEnumType = 'student' | 'admin'

export interface Student {
  id?: string
  username?: string
  name: string
  email: string
  photo?: string | null
  verified?: boolean | null
  password?: string
  role?: RoleEnumType | null
  verificationCode?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface StudentDataResponse {
  users?: Student[]
  data: Student[]
  count: number
  total: number
}
export interface StudentResponse extends DataResponse {
  data: StudentDataResponse
}

export interface StudentViewProps extends TableProps {
  handleAdd: () => void
  handleRevalidate: () => void
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
