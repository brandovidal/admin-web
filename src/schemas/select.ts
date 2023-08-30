
import { object, string } from 'zod'

export const SelectSchema = object({
  id: string({ required_error: 'Enter your ID.' }).nullish(),
  label: string({ required_error: 'Enter your label.' }).nullable(),
  value: string({ required_error: 'Enter your value.' }).nullable()
}).transform(arg => arg?.value)
