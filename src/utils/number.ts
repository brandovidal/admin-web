import isEmpty from 'just-is-empty'

export function convertNullOrNumber (val?: number | string | null): number | null {
  return isNaN(Number(val)) ? null : Number(val)
}

export function convertNumber (val?: number | string | null): number | null {
  return isEmpty(val) ? null : Number(val)
}
