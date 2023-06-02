// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryId, QueryParams } from '@/interfaces/common/Response'
import type { User, UserDataResponse } from '@/interfaces/api/User'

export const getUsers = async ({ page = 1, limit = 10, revalidate = true }: QueryParams): Promise<UserDataResponse> => {
  const response = await axios.get<UserDataResponse>(`${config.apiUrl}/users?page=${page}&limit=${limit}&revalidate=${String(revalidate)}`)
  return response.data
}

export const getUserId = async ({ id }: QueryId): Promise<User> => {
  const response = await axios.get<User>(`${config.apiUrl}/users/${id}`)
  return response.data
}

export const postUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${config.apiUrl}/users`, user)
  return response.data
}

export const updateUser = async (user: User): Promise<User> => {
  const userId = user.id ?? ''
  delete user.id
  const response = await axios.put(`${config.apiUrl}/users/${userId}`, user)
  return response.data
}

export const deleteUser = async (user: User): Promise<User> => {
  const userId = user.id ?? ''
  const response = await axios.delete(`${config.apiUrl}/users/${userId}`)
  return response.data
}
