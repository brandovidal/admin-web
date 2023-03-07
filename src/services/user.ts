import { config } from '@/config/variables'

// hooks
import { useFetch } from '@/hooks/useFetch'

/// interfaces
import type { FetchUserResponse, User, UserResponse } from '@/interfaces/User'

export const useGetUsers = (page = 1, size = 10): FetchUserResponse => {
  const { response, loading, error, handleAbortController } = useFetch(`${config?.apiUrl}/api/users?page=${page}&size=${size}`) as FetchUserResponse
  return { response, loading, error, handleAbortController }
}

export const addUser = async (user: User): Promise<UserResponse> => {
  const response = await fetch(`${config?.apiUrl}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return await response.json()
}
