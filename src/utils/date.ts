import dayjs, { type ManipulateType } from 'dayjs'

// Plugins
import utc from 'dayjs/plugin/utc'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isEmpty from 'just-is-empty'
import { FORMAT_DATE, LEGAL_AGE, START_YEAR } from '../constants/date'

dayjs.extend(utc)
dayjs.extend(isSameOrAfter)

export function parseDate (value: string): string {
  if (isEmpty(value)) return ''

  const date = value.split('-') ?? value.split('/')
  const day = date.at(0) as string
  const month = date.at(1) as string
  const year = date.at(2) as string

  return `${year}-${month}-${day}`
}

export function getDate (value?: string | Date | dayjs.Dayjs | null): dayjs.Dayjs {
  return dayjs(value)
}

export function addDate (value: string, count = 0, unit: ManipulateType = 'day'): dayjs.Dayjs {
  return getDate(value).add(count, unit)
}

export function toDate (value: string): Date {
  return getDate(value).toDate()
}

export function formatDate (date?: string | dayjs.Dayjs | null, formatDay = FORMAT_DATE): string {
  return getDate(date).utc().format(formatDay)
}

export function saveDate (value: string | Date): string {
  return dayjs(value).isValid() ? getDate(value).utc().toISOString() : ''
}

export function updateDate (value: string): string {
  return saveDate(parseDate(value))
}

export function isBeforeDate (value1 = null, value2 = null, unit: dayjs.OpUnitType = 'day'): boolean {
  if (isEmpty(value1) && isEmpty(value2)) return false

  return dayjs(value1).isBefore(value2, unit)
}

export function isAfterDate (value1 = null, value2 = null, unit: dayjs.OpUnitType = 'day'): boolean {
  if (isEmpty(value1) && isEmpty(value2)) return false

  return dayjs(value1).isAfter(value2, unit)
}

export const today = dayjs().utc()

export const overToday = formatDate(today)

export const over1900Years = formatDate(today.year(START_YEAR).startOf('year'))

export const over18Years = formatDate(today.subtract(LEGAL_AGE, 'year'))
