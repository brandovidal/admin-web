// libs
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryParams } from '@/interfaces/Response'
import type { UserDataResponse, User, UserResponse } from '@/interfaces/User'

// api
import { fetchUsers } from '@/api/user'

export const useGetUsers = ({ page = 1, limit = 10 }: QueryParams): UseQueryResult<UserDataResponse, Error> => {
  return useQuery<UserDataResponse, Error>(['users', { page, limit }], async () => await fetchUsers({ page, limit }), { keepPreviousData: true })
}

export const useAddUser = async (user: User): Promise<UserResponse> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  const response = await fetch(`${config?.apiUrl}/users`, options)
  return await response.json()
}

export const updateUser = async (userId: string, user: User): Promise<UserResponse> => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
  const response = await fetch(`${config?.apiUrl}/users/${userId}`, options)
  return await response.json()
}
