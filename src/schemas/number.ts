
import { object, string, number, union } from 'zod'

export const NumberSchema = object({
  formattedValue: string({ required_error: 'Enter your label.' }).nullable(),
  value: union([number({ required_error: 'Enter your value.' }), string({ required_error: 'Enter your value.' })]).nullable(),
  floatValue: number({ required_error: 'Enter your value.' }).nullish()
}).transform(arg => arg?.floatValue)
