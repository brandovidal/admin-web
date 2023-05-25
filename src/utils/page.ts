export const generateRecord = (isLoading: boolean, total: number): string => {
  if (isLoading) {
    return 'Loading...'
  }
  if (total === 0) {
    return 'without records'
  }
  if (total === 1) {
    return `${total} record`
  }
  return `${total} records`
}
