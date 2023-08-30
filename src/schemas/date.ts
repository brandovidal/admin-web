import { string, array, union, type ZodDate } from 'zod'
import { saveDate } from '@/utils/date'

export const DateSchema = (schema: ZodDate) => union([
  string().transform(val => saveDate(val)),
  array(schema).nonempty({ message: "Can't be empty date!" }).transform(arg => saveDate(arg[0]))
])
