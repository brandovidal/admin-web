import { z } from 'zod'

import { SelectSchema } from './select'

const CountrySchema = z.string({ required_error: 'Enter your country.', invalid_type_error: 'Enter your country' })

export const registerStudentSchema = z.object({
  name: z.string({ required_error: 'Enter your full name.' })
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  lastname: z.string({ required_error: 'Enter your full name.' })
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  country: z.union([CountrySchema, SelectSchema]),
  phone: z.string({ required_error: 'Enter your phone.' })
    .min(9, { message: 'Enter a minimum of 9 characters.' })
    .max(15, { message: 'Enter a maximum of 15 characters.' }).nullable(),
  dni: z.string({ required_error: 'Enter your DNI.' })
    .min(8, { message: 'Enter a minimum of 8 characters.' })
    .max(11, { message: 'Enter a maximum of 11 characters.' }).nullish(),
  email: z.string({ required_error: 'Enter your email.' })
    .min(5, { message: 'Enter a minimum of 5 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' })
    .email({ message: 'Enter a valid email address.' }),
  ladline: z.string({ required_error: 'Enter your ladline.' })
    .min(6, { message: 'Enter a minimum of 6 characters.' })
    .max(12, { message: 'Enter a maximum of 12 characters.' }).nullish(),
  ruc: z.string({ required_error: 'Enter your ruc.' })
    .min(11, { message: 'Enter a minimum of 11 characters.' }).nullish(),
  status: z.string({ required_error: 'Enter your status.' }).nullish(),
  businessName: z.string({ required_error: 'Enter your business name.' }).nullish(),
  training: z.string({ required_error: 'Enter your training.' }).nullish(),
  studyCenter: z.string({ required_error: 'Enter your study center.' }).nullish(),
  workplace: z.string({ required_error: 'Enter your workplace.' }).nullish(),
  workPosition: z.string({ required_error: 'Enter your work position.' }).nullish(),
  workAddress: z.string({ required_error: 'Enter your work address.' }).nullish()
})
  // .partial({ dni: true, ladline: true, ruc: true, businessName: true })
  .transform(data => ({
    ...data,
    name: data.name.trim(),
    lastname: data.name.trim(),
    country: data.country,
    phone: Number(data.phone),
    dni: Number(data.dni),
    email: data.email.trim().toLowerCase(),
    ladline: Number(data.ladline),
    ruc: Number(data.ruc),
    status: data.status,
    businessName: data.businessName?.trim(),
    training: data.training,
    studyCenter: data.studyCenter?.trim(),
    workPosition: data.workPosition?.trim(),
    workAddress: data.workAddress?.trim()
  }))

export type RegisterStudentInput = z.infer<typeof registerStudentSchema>

export const updateStudentSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' }),
  name: z.string({ required_error: 'Enter your full name.' }).min(3, { message: 'Enter a minimum of 3 characters.' }).max(50, { message: 'Enter a maximum of 50 characters.' }),
  email: z.string({ required_error: 'Enter your email.' }).min(5, { message: 'Enter a minimum of 5 characters.' }).max(50, { message: 'Enter a maximum of 50 characters.' }).email({ message: 'Enter a valid email address.' }),
  dni: z.number({ required_error: 'Enter your DNI.' }).min(8, { message: 'Enter a minimum of 8 characters.' }).max(11, { message: 'Enter a maximum of 11 characters.' }).nullish()
}).transform(data => ({
  name: data.name.trim(),
  lastname: data.name.trim(),
  email: data.email.trim().toLowerCase(),
  dni: data.dni
}))

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
