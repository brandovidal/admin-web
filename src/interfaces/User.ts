import type { NextRouter } from 'next/router'

// interfaces
import type { AlertProps } from './Alert'
import type { DataResponse, FetchResponse } from './Response'
import type { TableProps } from './Table'

export type RoleEnumType = 'user' | 'admin'

export interface User {
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

export interface UserDataResponse {
  users?: User[]
  data: User[]
  count: number
  total: number
}
export interface UserResponse extends DataResponse {
  data: UserDataResponse
}

export interface FetchUserResponse extends FetchResponse {
  response: UserResponse
}

export interface UserViewProps extends TableProps {
  router: NextRouter
}

export interface UserAddProps {
  router?: NextRouter
  control: any
  alert?: AlertProps
  disabled: boolean
  onSubmit: React.FormEventHandler
  onCancel: () => void
}
