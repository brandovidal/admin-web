import { z } from 'zod'

import { SelectSchema } from './select'

export const registerStudentSchema = z.object({
  name: z.string({ required_error: 'Enter your full name.' }).min(3, { message: 'Enter a minimum of 3 characters.' }).max(50, { message: 'Enter a maximum of 50 characters.' }),
  lastname: z.string({ required_error: 'Enter your full name.' }).min(3, { message: 'Enter a minimum of 3 characters.' }).max(50, { message: 'Enter a maximum of 50 characters.' }),
  country: SelectSchema,
  email: z.string({ required_error: 'Enter your email.' }).min(5, { message: 'Enter a minimum of 5 characters.' }).email({ message: 'Enter a valid email address.' }),
  dni: z.number({ required_error: 'Enter your DNI.' }).min(8, { message: 'Enter a minimum of 8 characters.' }).max(11, { message: 'Enter a maximum of 11 characters.' }).nullish()
}).transform(data => ({
  name: data.name.trim(),
  lastname: data.name.trim(),
  country: data.country?.value,
  email: data.email.trim().toLowerCase(),
  dni: data.dni
}))

export type RegisterStudentInput = z.infer<typeof registerStudentSchema>

export const updateStudentSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' }),
  name: z.string({ required_error: 'Enter your full name.' }).min(3, { message: 'Enter a minimum of 3 characters.' }).max(50, { message: 'Enter a maximum of 50 characters.' }),
  email: z.string({ required_error: 'Enter your email.' }).min(5, { message: 'Enter a minimum of 5 characters.' }).email({ message: 'Enter a valid email address.' }),
  dni: z.number({ required_error: 'Enter your DNI.' }).min(8, { message: 'Enter a minimum of 8 characters.' }).max(11, { message: 'Enter a maximum of 11 characters.' }).nullish()
}).transform(data => ({
  name: data.name.trim(),
  lastname: data.name.trim(),
  email: data.email.trim().toLowerCase(),
  dni: data.dni
}))

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
