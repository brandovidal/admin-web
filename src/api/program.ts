// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryId, QueryParams, Response } from '@/interfaces/common/Response'
import type { Program } from '@/interfaces/api/Program'

export const getPrograms = async ({ page = 1, limit = 10 }: QueryParams): Promise<Response<Program>> => {
  const response = await axios.get<Response<Program>>(`${config.apiUrl}/programs?page=${page}&limit=${limit}`)
  return response.data
}

export const getProgramId = async ({ id }: QueryId): Promise<Program> => {
  const response = await axios.get<Program>(`${config.apiUrl}/programs/${id}`)
  return response.data
}

export const postProgram = async (program: Program): Promise<Program> => {
  const response = await axios.post(`${config.apiUrl}/programs`, program)
  return response.data
}

export const updateProgram = async (program: Program): Promise<Program> => {
  const programId = program.id ?? ''
  delete program.id
  const response = await axios.put(`${config.apiUrl}/programs/${programId}`, program)
  return response.data
}

export const deleteProgram = async (program: Program): Promise<Program> => {
  const programId = program.id ?? ''
  const response = await axios.delete(`${config.apiUrl}/programs/${programId}`)
  return response.data
}
