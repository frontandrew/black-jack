export type PropsChange = {
  isOpen: boolean
  handle: () => void
}

export type Password = {
  currentPassword?: string
  password?: string
  confirmPassword?: string
}

export type CheckRepeatPassword = (
  formValues: Password
) => { text: string; error: true } | { text: string; error: false }
