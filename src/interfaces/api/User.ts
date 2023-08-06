import type { ReactElement } from 'react'

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
  role?: UserRoleEnumType | ReactElement
  status?: UserStatusEnumType | ReactElement
  verificationCode?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface UserData extends User {
  actions?: ReactElement | null
}
