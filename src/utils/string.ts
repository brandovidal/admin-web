import isEmpty from 'just-is-empty'

export function convertNullOrString (val?: string | null): string | null {
  return isEmpty(val) ? null : String(val)
}

export function sanitize (data = '', replaceText = '_') {
  if (isEmpty(data)) return data

  return data.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '').replace(/\s+/g, replaceText)
}
