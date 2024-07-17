export function login(value: string): string | string[] {
  const errors: string[] = []

  const MIN_LENGTH = 3
  const MAX_LENGTH = 20

  if (value === undefined || value === null) {
    return ''
  }

  if (value?.length < MIN_LENGTH) {
    errors.push(`Minimum length is ${MIN_LENGTH} characters`)
  }

  if (value?.length > MAX_LENGTH) {
    errors.push(`Maximum length is ${MAX_LENGTH} characters`)
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
    errors.push("Can't contain spetial simbols")
  }

  if (/^[0-9]+$/.test(value)) {
    errors.push("Can't contain only numbers")
  }

  if (/\s/.test(value)) {
    errors.push("Can't contain spases")
  }

  if (errors.length === 0) {
    return ''
  }

  return errors
}
