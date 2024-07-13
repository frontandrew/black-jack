export type FormUserHandler = (...args: unknown[]) => void
export type FormUserType = {
  submit?: FormUserHandler
  reset?: FormUserHandler
}
