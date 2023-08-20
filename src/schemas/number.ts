
import { z } from 'zod'

export const NumberSchema = z.object({
  formattedValue: z.string({ required_error: 'Enter your label.' }).nullable(),
  value: z.union([z.number({ required_error: 'Enter your value.' }), z.string({ required_error: 'Enter your value.' })]).nullable(),
  floatValue: z.number({ required_error: 'Enter your value.' }).nullish()
}).transform(arg => arg?.value)
