import type { DataResponse } from '@/hooks/useFetch'

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

export interface FetchUserResponse {
  response: UserResponse
  loading: boolean
  error: string | null
}
