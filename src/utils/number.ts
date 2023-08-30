import isEmpty from 'just-is-empty'

export function convertNullOrNumber (val?: number | string | null): number | null {
  return isNaN(Number(val)) ? null : Number(val)
}

export function convertNumber (val?: number | string | null): number | null {
  return isEmpty(val) ? null : Number(val)
}
export function formatNumber (val?: number | null, locale = 'es-PE'): string {
  if (typeof val !== 'number' || isNaN(val)) {
    return ''
  }

  return val.toLocaleString(locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
