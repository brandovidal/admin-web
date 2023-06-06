import type { NextRouter } from 'next/router'

// interfaces
import type { AlertProps } from '../common/Alert'
import type { DataResponse } from '../common/Response'
import type { TableProps } from '../common/Table'
import type { ReactElement } from 'react'

export type RoleEnumType = 'user' | 'admin'
export type StatusEnumType = 'active' | 'inactive' | 'deleted'

export interface User {
  id?: string
  username?: string
  name: string
  email: string
  photo?: string | null
  verified?: boolean | null
  password?: string
  role?: RoleEnumType
  status?: StatusEnumType
  verificationCode?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface UserData {
  id?: string
  username?: string
  name: string
  email: string
  photo?: string | null
  verified?: boolean | null
  password?: string
  role?: ReactElement | null
  status?: ReactElement | null
  verificationCode?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  actions?: ReactElement | null
}

export interface UserRole {
  role?: RoleEnumType
}
export interface UserStatus {
  status?: StatusEnumType
}

export interface UserDataResponse {
  users?: User[]
  data: User[]
  count: number
  total: number
}
export interface UserResponse extends DataResponse {
  data: UserDataResponse
}

export interface UserViewProps extends TableProps {
  handleAdd: () => void
  handleRevalidate: () => void
}

export interface UserAddProps {
  router?: NextRouter
  control: any
  alert?: AlertProps
  disabled: boolean
  onSubmit: React.FormEventHandler
  onCancel: () => void
}
export interface UserEditProps extends UserAddProps {}
