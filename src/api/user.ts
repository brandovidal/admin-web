// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryParams } from '@/interfaces/Response'
import type { User, UserDataResponse } from '@/interfaces/User'

export const getUsers = async ({ page = 1, limit = 10 }: QueryParams): Promise<UserDataResponse> => {
  const response = await axios.get<UserDataResponse>(`${config.apiUrl}/users?page=${page}&limit=${limit}`)
  return response.data
}

export const postUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${config.apiUrl}/users`, user)
  return response.data
}

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${config.apiUrl}/users/${user?.id ?? ''}`, user)
  return response.data
}
