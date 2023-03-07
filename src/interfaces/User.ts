import type { DataResponse, FetchResponse } from '@/hooks/useFetch'
import type { NextRouter } from 'next/router'
import type { TableProps } from './Table'

export type RoleEnumType = 'user' | 'admin'

export interface User {
  id: string
  username: string
  name: string
  email: string
  photo: string | null
  verified: boolean | null
  password: string
  role: RoleEnumType | null
  verificationCode: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserData {
  id?: string
  username?: string
  name: string
  email: string
  photo?: string | null
  verified?: boolean | null
  password?: string
  role: RoleEnumType | null
  verificationCode?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface UserDataResponse {
  users: User[]
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
