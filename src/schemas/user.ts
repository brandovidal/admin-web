// form
import { z } from 'zod'

export const registerUserSchema = z.object({
  username: z.string({ required_error: 'Ingresa tu usuario.' }).min(3, { message: 'Ingresa 3 caracteres como minimo' }),
  name: z.string({ required_error: 'Ingresa tu nombre completo.' }).min(3, { message: 'Ingresa 3 caracteres como minimo.' }),
  email: z.string({ required_error: 'Ingresa tu correo.' }).min(5, { message: 'Ingresa 5 caracteres como minimo.' }).email({
    message: 'Ingresa un correo valido.'
  }),
  password: z.string({ required_error: 'Ingresa tu contraseña.' }).min(6, { message: 'Ingresa una contraseña con 6 caracteres' })
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>

export const updateStudentSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }),
  username: z.string({ required_error: 'Ingresa tu usuario.' }).min(3, { message: 'Ingresa 3 caracteres como minimo' }),
  name: z.string({ required_error: 'Ingresa tu nombre completo.' }).min(3, { message: 'Ingresa 3 caracteres como minimo.' }),
  email: z.string({ required_error: 'Ingresa tu correo.' }).min(5, { message: 'Ingresa 5 caracteres como minimo.' }).email({
    message: 'Ingresa un correo valido.'
  }),
  password: z.string({ required_error: 'Ingresa tu contraseña.' }).min(6, { message: 'Ingresa una contraseña con 6 caracteres' })
})

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
