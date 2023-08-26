import { z } from 'zod'
import { saveDate } from '@/utils/date'

export const DateSchema = (schema: z.ZodDate) => z.array(schema).nonempty({ message: "Can't be empty date!" }).transform(arg => saveDate(arg[0]))
