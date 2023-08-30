// libs
import { useMutation, type UseMutationResult, useQuery, type UseQueryResult } from '@tanstack/react-query'

// variables

// interfaces
import type { QueryParams, Response } from '@/interfaces/common/Response'
import type { Program } from '@/interfaces/api/Program'

// api
import { deleteProgram, getProgramId, getPrograms, postProgram, updateProgram } from '@/api/program'

export const useGetPrograms = ({ page = 1, limit = 10 }: QueryParams): UseQueryResult<Response<Program>, Error> => {
  return useQuery<Response<Program>, Error>(['programs', page, limit], async () => await getPrograms({ page, limit }), { refetchOnWindowFocus: false, refetchOnReconnect: true })
}

export const useGetProgramId = ({ id, onError }): UseQueryResult<Program, Error> => {
  return useQuery<Program, Error>(['programs', id], async () => await getProgramId({ id }), { onError })
}

export const useCreateProgram = ({ onSuccess, onError }): UseMutationResult<Program, Error, Program, unknown> => {
  return useMutation(async (program: Program) => await postProgram(program), { onSuccess, onError })
}

export const useUpdateProgram = ({ onSuccess, onError }): UseMutationResult<Program, Error, Program, unknown> => {
  return useMutation(async (program: Program) => await updateProgram(program), { onSuccess, onError })
}

export const useDeleteProgram = ({ onSuccess, onError }): UseMutationResult<Program, Error, Program, unknown> => {
  return useMutation(async (program: Program) => await deleteProgram(program), { onSuccess, onError })
}
