export function password(value: string): string[] {
  const errors: string[] = []

  const MIN_LENGTH = 8
  const MAX_LENGTH = 40

  if (value.length < MIN_LENGTH) {
    errors.push(` Minimum length is ${MIN_LENGTH} characters.`)
  }

  if (value.length > MAX_LENGTH) {
    errors.push(` Maximum length is ${MAX_LENGTH} characters.`)
  }

  if (!/[A-Z]/.test(value)) {
    errors.push('capital letter.')
  }

  if (!/[0-9]/.test(value)) {
    errors.push(' Number.')
  }

  return errors
}
