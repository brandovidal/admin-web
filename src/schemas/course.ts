import { type z, object, string, number, intersection, date, union } from 'zod'

import { DateSchema } from './date'
import { NumberSchema } from './number'

// schemas

const IdSchema = object({
  id: string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' })
})
const StartDateSchema = date({ required_error: 'Select your start date.', invalid_type_error: 'Valid your start date.' })
const EndDateSchema = date({ required_error: 'Select your end date.', invalid_type_error: 'Valid your end date.' })
const AmountSchema = number({ required_error: 'Amount is required.', invalid_type_error: 'Amount must be a number.' })
const DiscountSchema = number({ required_error: 'Discount is required.', invalid_type_error: 'Discount must be a number.' })
const TotalSchema = number({ required_error: 'Total is required.', invalid_type_error: 'Total must be a number.' })

export const courseSchema = object({
  name: string({ required_error: 'Name is required' })
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  code: string({
    required_error: 'Code is required'
  })
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  uniqueProgram: string({ required_error: 'Unique program is required', invalid_type_error: 'Unique program must be a string.' }),
  startDate: DateSchema(StartDateSchema).nullish(),
  endDate: DateSchema(EndDateSchema).nullish(),
  amount: union([AmountSchema, NumberSchema]).nullish(),
  discount: union([DiscountSchema, NumberSchema]).nullish(),
  total: union([TotalSchema, NumberSchema]).nullish()
})

function transformData (arg = registerCourseSchema) {
  console.log('🚀 ~ file: course.ts:43 ~ transformData ~ arg:', arg)
  const { startDate, endDate, amount, discount, total, ...data } = arg
  return {
    ...data,
    name: data.name.trim(),
    code: data.code.trim()
  }
}

export const registerCourseSchema = courseSchema
  .transform(transformData)

export type RegisterCourseInput = z.infer<typeof registerCourseSchema>

export const updateCourseSchema = intersection(courseSchema, IdSchema)
  .transform(transformData)

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>
