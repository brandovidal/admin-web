
import { z } from 'zod'
// import isEmpty from 'just-is-empty'

export const SelectSchema = z.object({
  id: z.string({ required_error: 'Enter your ID.' }).nullish(),
  label: z.string({ required_error: 'Enter your label.' }).nullable(),
  value: z.string({ required_error: 'Enter your value.' }).nullable()
})
  // .nullish()
  // .superRefine((arg, ctx) => {
  //   console.log('🚀 ~ file: select.ts:13 ~ .superRefine ~ arg:', arg)
  //   if (isEmpty(arg)) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'Select a value.'
  //     })
  //   }
  //   const val = arg?.value
  //   console.log('🚀 ~ file: select.ts:21 ~ .superRefine ~ val:', val)
  //   return z.INVALID
  // })
  .transform(arg => arg?.value)
