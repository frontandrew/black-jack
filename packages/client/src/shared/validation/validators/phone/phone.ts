export function phone(value: string): string[] {
  const errors: string[] = []

  const MIN_LENGTH = 10
  const MAX_LENGTH = 15

  if (value === undefined) {
    return []
  }

  if (value.length < MIN_LENGTH) {
    errors.push(` Minimum length is ${MIN_LENGTH} characters.`)
  }

  if (value.length > MAX_LENGTH) {
    errors.push(` Maximum length is ${MAX_LENGTH} characters.`)
  }

  if (!/^((\+7|7|8)+([0-9]){10})|(([0-9]){10})$/.test(value)) {
    errors.push(`Enter the correct phone number`)
  }

  return errors
}
