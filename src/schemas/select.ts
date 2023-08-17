
import isEmpty from 'just-is-empty'
import { z } from 'zod'

export const SelectSchema = z
  .object({
    id: z.string({ required_error: 'Enter your ID.', invalid_type_error: 'Enter a valid ID.' }).nullish(),
    label: z.string({ required_error: 'Enter your label.', invalid_type_error: 'Enter a valid label.' }).nullable(),
    value: z.string({ required_error: 'Enter your value.', invalid_type_error: 'Enter a valid value.' }).nullable()
  })
  .nullish()
  .superRefine((arg, ctx) => {
    if (isEmpty(arg)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select a value.'
      })
    }

    return z.NEVER // The return value is not used, but we need to return something to satisfy the typing
  })
