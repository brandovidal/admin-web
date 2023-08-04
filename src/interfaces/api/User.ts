import type { NextRouter } from 'next/router'
import type { ReactElement } from 'react'

// interfaces
import type { AlertProps } from '../common/Alert'
import type { DataResponse } from '../common/Response'
import type { TableProps } from '../common/Table'

export type UserRoleEnumType = 'user' | 'admin'
export type UserStatusEnumType = 'active' | 'inactive' | 'deleted' | 'banned'

export interface User {
  id?: string
  username?: string
  name: string
  email: string
  photo?: string | null
  verified?: boolean | null
  password?: string
  role?: UserRoleEnumType
  status?: UserStatusEnumType
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
  role?: ReactElement
  status?: ReactElement
  verificationCode?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  actions?: ReactElement | null
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
