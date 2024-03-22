import { type z, object, string, number, intersection, date, union } from 'zod'

import { DateSchema } from './date'
import { NumberSchema } from './number'
import { SelectSchema } from './select'

// schemas

const IdSchema = object({
  id: string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' })
})
const StartDateSchema = date({ required_error: 'Select your start date.', invalid_type_error: 'Valid your start date.' })
const EndDateSchema = date({ required_error: 'Select your end date.', invalid_type_error: 'Valid your end date.' })
const AmountSchema = number({ required_error: 'Amount is required.', invalid_type_error: 'Amount must be a number.' })
const DiscountSchema = number({ required_error: 'Discount is required.', invalid_type_error: 'Discount must be a number.' })
const TotalSchema = number({ required_error: 'Total is required.', invalid_type_error: 'Total must be a number.' })
const CourseSchema = string({ required_error: 'Course is required.', invalid_type_error: 'Course must be a string.' })

export const programSchema = object({
  id: string().optional(),
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
  amount: union([AmountSchema, NumberSchema]).nullish(),
  discount: union([DiscountSchema, NumberSchema]).nullish(),
  total: union([TotalSchema, NumberSchema]).nullish(),
  course: union([CourseSchema, SelectSchema]).nullable(),
  courseId: string({
    required_error: 'Course ID is required'
  })
    .length(24, { message: 'Enter 24 characters' })
    .nullish()
})
type ProgramInput = z.infer<typeof programSchema>

function transformData (arg: ProgramInput) {
  const { ...data } = arg
  console.log('🚀 ~ file: program.ts:43 ~ transformData ~ data:', data)

  return {
    name: data.name.trim(),
    code: data.code.trim(),
    startDate: data.startDate,
    endDate: data.endDate,
    amount: data.amount,
    discount: data.discount,
    total: data.total,
    courseId: data.courseId
  }
}

export const registerProgramSchema = programSchema.transform(transformData)

export type RegisterProgramInput = z.infer<typeof registerProgramSchema>

export const updateProgramSchema = intersection(programSchema, IdSchema).transform(transformData)

export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
