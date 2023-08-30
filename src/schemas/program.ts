import { type z, object, string, number, intersection, date } from 'zod'

// utils
import { convertNumber } from '@/utils/number'

import { DateSchema } from './date'

// schemas

const IdSchema = object({
  id: string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' })
})
const StartDateSchema = date({ required_error: 'Select your start date.', invalid_type_error: 'Valid your start date.' })
const EndDateSchema = date({ required_error: 'Select your end date.', invalid_type_error: 'Valid your end date.' })

export const programSchema = object({
  name: string({
    required_error: 'Name is required'
  })
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  code: string({
    required_error: 'Code is required'
  })
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  startDate: DateSchema(StartDateSchema),
  endDate: DateSchema(EndDateSchema),
  amount: number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number'
  }).nullish().transform(val => convertNumber(val)),
  discount: number({
    required_error: 'Discount is required',
    invalid_type_error: 'Discount must be a number'
  }).nullish().transform(val => convertNumber(val)),
  total: number({
    required_error: 'Total is required',
    invalid_type_error: 'Total must be a number'
  }).nullish().transform(val => convertNumber(val)),
  courseId: string({
    required_error: 'Course ID is required'
  }).length(24).nullish()
})

export const registerProgramSchema = programSchema
  .transform(data => {
    return {
      ...data,
      name: data.name.trim(),
      code: data.code.trim()
    }
  })

export type RegisterProgramInput = z.infer<typeof registerProgramSchema>

export const updateProgramSchema = intersection(programSchema, IdSchema)
  .transform(data => {
    return {
      ...data,
      name: data.name.trim(),
      code: data.code.trim()
    }
  })

export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
