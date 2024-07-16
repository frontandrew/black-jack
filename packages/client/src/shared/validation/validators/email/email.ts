export function email(value: string): string | undefined {
  const errors: string[] = []

  if (value === undefined) {
    return ''
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    errors.push(`Enter the correct email`)
  }

  return errors[0]
}