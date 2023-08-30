// libs
import { useMutation, type UseMutationResult, useQuery, type UseQueryResult } from '@tanstack/react-query'

// variables

// interfaces
import type { QueryParams, Response } from '@/interfaces/common/Response'
import type { Course } from '@/interfaces/api/Course'

// api
import { deleteCourse, getCourseId, getCourses, postCourse, updateCourse } from '@/api/course'

export const useGetCourses = ({ page = 1, limit = 10 }: QueryParams): UseQueryResult<Response<Course>, Error> => {
  return useQuery<Response<Course>, Error>(['courses', page, limit], async () => await getCourses({ page, limit }), { refetchOnWindowFocus: false, refetchOnReconnect: true })
}

export const useGetCourseId = ({ id, onError }): UseQueryResult<Course, Error> => {
  return useQuery<Course, Error>(['courses', id], async () => await getCourseId({ id }), { onError })
}

export const useCreateCourse = ({ onSuccess, onError }): UseMutationResult<Course, Error, Course, unknown> => {
  return useMutation(async (course: Course) => await postCourse(course), { onSuccess, onError })
}

export const useUpdateCourse = ({ onSuccess, onError }): UseMutationResult<Course, Error, Course, unknown> => {
  return useMutation(async (course: Course) => await updateCourse(course), { onSuccess, onError })
}

export const useDeleteCourse = ({ onSuccess, onError }): UseMutationResult<Course, Error, Course, unknown> => {
  return useMutation(async (course: Course) => await deleteCourse(course), { onSuccess, onError })
}
