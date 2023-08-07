// form
import { z } from 'zod'

export const registerStudentSchema = z.object({
  name: z.string({ required_error: 'Ingresa tu nombre completo.' }).min(3, { message: 'Ingresa 3 caracteres como minimo.' }).max(50, { message: 'Ingresa 50 caracteres como máximo.' }),
  lastname: z.string({ required_error: 'Ingresa tu nombre completo.' }).min(3, { message: 'Ingresa 3 caracteres como minimo.' }).max(50, { message: 'Ingresa 50 caracteres como máximo.' }),
  country: z.string({ required_error: 'Ingresa tu nombre completo.' }),
  email: z.string({ required_error: 'Ingresa tu correo.' }).min(5, { message: 'Ingresa 5 caracteres como minimo.' }).email({
    message: 'Ingresa un correo valido.'
  }),
  dni: z.number({ required_error: 'Ingresa tu dni.' }).min(8, { message: 'Ingresa una dni con 8 como minimo.' }).max(11, { message: 'Ingresa una dni con 11 como máximo.' }).nullish()
}).transform(data => ({
  name: data.name.trim(),
  lastname: data.name.trim(),
  country: data.country,
  email: data.email.trim().toLowerCase(),
  dni: data.dni
}))

export type RegisterStudentInput = z.infer<typeof registerStudentSchema>

export const updateStudentSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }),
  name: z.string({ required_error: 'Ingresa tu nombre completo.' }).min(3, { message: 'Ingresa 3 caracteres como minimo.' }),
  email: z.string({ required_error: 'Ingresa tu correo.' }).min(5, { message: 'Ingresa 5 caracteres como minimo.' }).email({
    message: 'Ingresa un correo valido.'
  }),
  dni: z.number({ required_error: 'Ingresa tu dni.' }).min(8, { message: 'Ingresa una dni con 8 como minimo.' }).max(11, { message: 'Ingresa una dni con 11 como máximo.' }).nullish()
}).transform(data => ({
  name: data.name.trim(),
  lastname: data.name.trim(),
  email: data.email.trim().toLowerCase(),
  dni: data.dni
}))

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
