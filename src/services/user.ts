// libs
import { useMutation, type UseMutationResult, useQuery, type UseQueryResult } from '@tanstack/react-query'

// api
import { deleteUser, getUserId, getUsers, postUser, updateUser } from '@/api/user'

// interfaces
import type { QueryParams, Response } from '@/interfaces/common/Response'
import type { User } from '@/interfaces/api/User'

export const useGetUsers = ({ page = 1, limit = 10 }: QueryParams): UseQueryResult<Response<User>, Error> => {
  return useQuery<Response<User>, Error>(['users', page, limit], async () => await getUsers({ page, limit }), { refetchOnWindowFocus: false, refetchOnReconnect: true })
}

export const useGetUserId = ({ id, onError }): UseQueryResult<User, Error> => {
  return useQuery<User, Error>(['users', id], async () => await getUserId({ id }), { onError })
}

export const useCreateUser = ({ onSuccess, onError }): UseMutationResult<User, Error, User, unknown> => {
  return useMutation(async (user: User) => await postUser(user), { onSuccess, onError })
}

export const useUpdateUser = ({ onSuccess, onError }): UseMutationResult<User, Error, User, unknown> => {
  return useMutation(async (user: User) => await updateUser(user), { onSuccess, onError })
}

export const useDeleteUser = ({ onSuccess, onError }): UseMutationResult<User, Error, User, unknown> => {
  return useMutation(async (user: User) => await deleteUser(user), { onSuccess, onError })
}
