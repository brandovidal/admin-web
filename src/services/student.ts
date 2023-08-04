// libs
import { useMutation, type UseMutationResult, useQuery, type UseQueryResult } from '@tanstack/react-query'

// variables

// interfaces
import type { QueryParams } from '@/interfaces/common/Response'
import type { StudentDataResponse, Student } from '@/interfaces/api/Student'

// api
import { deleteStudent, getStudentId, getStudents, postStudent, updateStudent } from '@/api/student'

export const useGetStudents = ({ page = 1, limit = 10, revalidate = true }: QueryParams): UseQueryResult<StudentDataResponse, Error> => {
  return useQuery<StudentDataResponse, Error>(['students', page, limit, revalidate], async () => await getStudents({ page, limit, revalidate }), { refetchOnWindowFocus: false, refetchOnReconnect: true })
}

export const useGetStudentId = ({ id, onError }): UseQueryResult<Student, Error> => {
  return useQuery<Student, Error>(['students', id], async () => await getStudentId({ id }), { onError })
}

export const useCreateStudent = ({ onSuccess, onError }): UseMutationResult<Student, Error, Student, unknown> => {
  return useMutation(async (student: Student) => await postStudent(student), { onSuccess, onError })
}

export const useUpdateStudent = ({ onSuccess, onError }): UseMutationResult<Student, Error, Student, unknown> => {
  return useMutation(async (student: Student) => await updateStudent(student), { onSuccess, onError })
}

export const useDeleteStudent = ({ onSuccess, onError }): UseMutationResult<Student, Error, Student, unknown> => {
  return useMutation(async (student: Student) => await deleteStudent(student), { onSuccess, onError })
}
