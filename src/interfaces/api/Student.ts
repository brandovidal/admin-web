import type { NextRouter } from 'next/router'
import type { ReactElement } from 'react'

// interfaces
import type { AlertProps } from '../common/Alert'
import type { TableProps } from '../common/Table'

export type StudentStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface Student {
  id?: string
  username?: string
  name: string
  email: string
  photo?: string | null
  verified?: boolean | null
  password?: string
  status?: StudentStatusEnumType | ReactElement
  verificationCode?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
export interface StudentData extends Student {
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
