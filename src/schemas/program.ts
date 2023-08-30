import { z } from 'zod'

// utils
import { convertNullOrNumber, convertNumber } from '@/utils/number'
import { convertNullOrString } from '@/utils/string'

// schemas
import { SelectSchema } from './select'
import { NumberSchema } from './number'
import { DateSchema } from './date'

const IdSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' })
})
const CountrySchema = z.string({ required_error: 'Select your country.', invalid_type_error: 'Select your country.' }).trim()
const StatusSchema = z.string({ required_error: 'Select your status.', invalid_type_error: 'Select your status.' }).trim()
const TrainingSchema = z.string({ required_error: 'Select your training.', invalid_type_error: 'Select your training.' }).trim()
const PhoneSchema = z.number({ required_error: 'Enter a phone.', invalid_type_error: 'Enter a phone.' })
  .nullish()
  .transform(val => convertNullOrNumber(val))
  .pipe(
    z.number({ required_error: 'Enter your phone.', invalid_type_error: 'Enter a valid phone.' })
      .gte(900_000_000, 'Phone must be greater than or equal to 900000000.')
      .lte(999_999_999_999, 'Phone must be less than or equal to 999999999999.')
  )
const DniSchema = z.union([
  z.string({ required_error: 'Select your dni.', invalid_type_error: 'Select your dni.' }).trim().nullish(),
  z.number({ required_error: 'Select your dni.', invalid_type_error: 'Select your dni.' }).nullish()
])
const BirthdaySchema = z.date({ required_error: 'Select your birthday.', invalid_type_error: 'Select your birthday.' })

export const countryProgramSchema = z.object({
  country: z.union([SelectSchema, CountrySchema]),
  dni: DniSchema.nullish().transform(val => convertNullOrNumber(val))
})
  .superRefine((arg, ctx) => {
    if (arg.country === 'PER' && arg.dni === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter your DNI.',
        path: ['dni']
      })
    }

    if (arg.dni !== null && String(arg.dni).length < 8) {
      ctx.addIssue({
        code: 'custom',
        message: 'Enter a minimum of 8 characters.',
        path: ['dni']
      })
    }
  })

export const programSchema = z.object({
  name: z.string({ required_error: 'Enter your full name.' })
    .trim()
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  lastname: z.string({ required_error: 'Enter your full name.' })
    .trim()
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  birthday: DateSchema(BirthdaySchema),
  phoneCode: z.string({ required_error: 'Enter your phone code.' }),
  phone: z.union([PhoneSchema, NumberSchema]),
  email: z.string({ required_error: 'Enter your email.' })
    .trim()
    .min(5, { message: 'Enter a minimum of 5 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' })
    .email({ message: 'Enter a valid email address.' }),
  ladline: z.string({ required_error: 'Enter your ladline.' }).nullish().transform(val => convertNumber(val)),
  ruc: z.string({ required_error: 'Enter your ruc.' }).nullish().transform(val => convertNumber(val)),
  status: z.union([StatusSchema, SelectSchema]).transform(val => convertNullOrString(val)),
  businessName: z.string({ required_error: 'Enter your business name.' }).nullish(),
  training: z.union([TrainingSchema, SelectSchema]).nullish().transform(val => convertNullOrString(val)),
  postgraduateTraining: z.boolean().nullish().default(false),
  graduateTraining: z.boolean().nullish().default(false),
  bachelorTraining: z.boolean().nullish().default(false),
  programTraining: z.boolean().nullish().default(false),
  studyCenter: z.string({ required_error: 'Enter your study center.' }).nullish(),
  workplace: z.string({ required_error: 'Enter your workplace.' }).nullish(),
  workPosition: z.string({ required_error: 'Enter your work position.' }).nullish(),
  workAddress: z.string({ required_error: 'Enter your work address.' }).nullish()
})

export const registerProgramSchema = z.intersection(countryProgramSchema, programSchema)
  .transform(arg => {
    const { training, ...data } = arg
    return {
      ...data,
      name: data.name.trim(),
      lastname: data.lastname.trim(),
      email: data.email.trim().toLowerCase(),
      businessName: data.businessName?.trim(),
      studyCenter: data.studyCenter?.trim(),
      workPosition: data.workPosition?.trim(),
      workAddress: data.workAddress?.trim(),
      status: data.status?.trim() === 'active',
      postgraduateTraining: training === 'postgraduateTraining',
      graduateTraining: training === 'graduateTraining',
      bachelorTraining: training === 'bachelorTraining',
      programTraining: training === 'programTraining'
    }
  })

export type RegisterProgramInput = z.infer<typeof registerProgramSchema>

export const updateProgramSchema = z.intersection(countryProgramSchema, programSchema).and(IdSchema)
  .transform(arg => {
    const { training, ...data } = arg
    return {
      ...data,
      name: data.name.trim(),
      lastname: data.lastname.trim(),
      email: data.email.trim().toLowerCase(),
      businessName: data.businessName?.trim(),
      studyCenter: data.studyCenter?.trim(),
      workPosition: data.workPosition?.trim(),
      workAddress: data.workAddress?.trim(),
      status: data.status?.trim() === 'active',
      postgraduateTraining: training === 'postgraduateTraining',
      graduateTraining: training === 'graduateTraining',
      bachelorTraining: training === 'bachelorTraining',
      programTraining: training === 'programTraining'
    }
  })

export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
