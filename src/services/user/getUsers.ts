import { useQuery } from '@tanstack/react-query'

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

interface UsersResponse {
  totalPages: number
  users: User[] | undefined
}

export const getUsers = async (page = 1, size = 10): Promise<any> => {
  const response = await fetch(`http://localhost:5000/api/users?page=${page}&size=${size}`)
  // `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
  return await response.json()
}
