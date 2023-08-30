import { type z, object, string, number, date, boolean, union, intersection, ZodIssueCode } from 'zod'

// utils
import { convertNullOrNumber, convertNumber } from '@/utils/number'
import { convertNullOrString } from '@/utils/string'

// schemas
import { SelectSchema } from './select'
import { NumberSchema } from './number'
import { DateSchema } from './date'

const IdSchema = object({
  id: string({ required_error: 'ID is required' }).length(24, { message: 'ID must be 24 characters' }).max(50, { message: 'Enter a maximum of 50 characters.' })
})
const CountrySchema = string({ required_error: 'Select your country.', invalid_type_error: 'Select your country.' }).trim()
const StatusSchema = string({ required_error: 'Select your status.', invalid_type_error: 'Select your status.' }).trim()
const TrainingSchema = string({ required_error: 'Select your training.', invalid_type_error: 'Select your training.' }).trim()
const PhoneSchema = number({ required_error: 'Enter a phone.', invalid_type_error: 'Enter a phone.' })
  .nullish()
  .transform(val => convertNullOrNumber(val))
  .pipe(
    number({ required_error: 'Enter your phone.', invalid_type_error: 'Enter a valid phone.' })
      .gte(900_000_000, 'Phone must be greater than or equal to 900000000.')
      .lte(999_999_999_999, 'Phone must be less than or equal to 999999999999.')
  )
const DniSchema = union([
  string({ required_error: 'Select your dni.', invalid_type_error: 'Valid your dni.' }).trim().nullish(),
  number({ required_error: 'Select your dni.', invalid_type_error: 'Valid your dni.' }).nullish()
])
const BirthdaySchema = date({ required_error: 'Select your birthday.', invalid_type_error: 'Valid your birthday.' })

export const countryStudentSchema = object({
  country: union([SelectSchema, CountrySchema]),
  dni: DniSchema.nullish().transform(val => convertNullOrNumber(val))
})
  .superRefine((arg, ctx) => {
    if (arg.country === 'PER' && arg.dni === null) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
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

export const studentSchema = object({
  name: string({ required_error: 'Enter your full name.' })
    .trim()
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  lastname: string({ required_error: 'Enter your full name.' })
    .trim()
    .min(3, { message: 'Enter a minimum of 3 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' }),
  birthday: DateSchema(BirthdaySchema),
  phoneCode: string({ required_error: 'Enter your phone code.' }),
  phone: union([PhoneSchema, NumberSchema]),
  email: string({ required_error: 'Enter your email.' })
    .trim()
    .min(5, { message: 'Enter a minimum of 5 characters.' })
    .max(50, { message: 'Enter a maximum of 50 characters.' })
    .email({ message: 'Enter a valid email address.' }),
  ladline: string({ required_error: 'Enter your ladline.' }).nullish().transform(val => convertNumber(val)),
  ruc: string({ required_error: 'Enter your ruc.' }).nullish().transform(val => convertNumber(val)),
  status: union([StatusSchema, SelectSchema]).transform(val => convertNullOrString(val)),
  businessName: string({ required_error: 'Enter your business name.' }).nullish(),
  training: union([TrainingSchema, SelectSchema]).nullish().transform(val => convertNullOrString(val)),
  postgraduateTraining: boolean().nullish().default(false),
  graduateTraining: boolean().nullish().default(false),
  bachelorTraining: boolean().nullish().default(false),
  studentTraining: boolean().nullish().default(false),
  studyCenter: string({ required_error: 'Enter your study center.' }).nullish(),
  workplace: string({ required_error: 'Enter your workplace.' }).nullish(),
  workPosition: string({ required_error: 'Enter your work position.' }).nullish(),
  workAddress: string({ required_error: 'Enter your work address.' }).nullish()
})

export const registerStudentSchema = intersection(countryStudentSchema, studentSchema)
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
      studentTraining: training === 'studentTraining'
    }
  })

export type RegisterStudentInput = z.infer<typeof registerStudentSchema>

export const updateStudentSchema = intersection(countryStudentSchema, studentSchema).and(IdSchema)
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
      studentTraining: training === 'studentTraining'
    }
  })

export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
