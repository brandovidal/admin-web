// libs
import { useMutation, type UseMutationResult, useQuery, type UseQueryResult } from '@tanstack/react-query'

// variables

// interfaces
import type { QueryParams } from '@/interfaces/Response'
import type { UserDataResponse, User } from '@/interfaces/User'

// api
import { deleteUser, getUserId, getUsers, postUser, updateUser } from '@/api/user'

export const useGetUsers = ({ page = 1, limit = 10 }: QueryParams): UseQueryResult<UserDataResponse, Error> => {
  return useQuery<UserDataResponse, Error>(['users', page, limit], async () => await getUsers({ page, limit }), { refetchOnWindowFocus: true })
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
