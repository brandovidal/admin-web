// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryParams } from '@/interfaces/Response'
import type { UserDataResponse } from '@/interfaces/User'

export const fetchUsers = async ({ page = 1, limit = 10 }: QueryParams): Promise<UserDataResponse> => {
  const response = await axios.get<UserDataResponse>(`${config.apiUrl}/users?page=${page}&limit=${limit}`)
  return response.data
}
