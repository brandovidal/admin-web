
import { z } from 'zod'

export const SelectSchema = z.object({
  id: z.string({ required_error: 'Enter your ID.' }).nullish(),
  label: z.string({ required_error: 'Enter your label.' }).nullable(),
  value: z.string({ required_error: 'Enter your value.' }).nullable()
}).transform(arg => arg?.value)
