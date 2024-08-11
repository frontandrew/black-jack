export function email(value: string): string | string[] {
  const errors: string[] = []

  if (value === undefined || value === null) {
    return ''
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    errors.push('Enter the correct email')
  }

  if (errors.length === 0) {
    return ''
  }

  return errors
}
