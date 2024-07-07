export function name(value: string): string[] {
  const errors: string[] = []

  const MIN_LENGTH = 1
  const MAX_LENGTH = 20

  if (value === undefined) {
    return []
  }

  if (value.length < MIN_LENGTH) {
    errors.push(` Minimum length is ${MIN_LENGTH} characters.`)
  }

  if (value.length > MAX_LENGTH) {
    errors.push(` Maximum length is ${MAX_LENGTH} characters.`)
  }

  if (!/^[А-ЯЁа-яёA-Za-z-]+$/.test(value)) {
    errors.push(`It can contain only letters and hyphens`)
  }

  if (!/^[А-ЯЁA-Z]/.test(value)) {
    errors.push(`Must start with a capital letter`)
  }

  if (/\s/.test(value)) {
    errors.push(`Can't contain spaces`)
  }

  if (/[0-9]/.test(value)) {
    errors.push(`It can't contain numbers`)
  }

  return errors
}
