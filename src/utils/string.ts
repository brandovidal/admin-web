import isEmpty from 'just-is-empty'

export function convertNullOrString (val?: string | null): string | null {
  return isEmpty(val) ? null : String(val)
}
