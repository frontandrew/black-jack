import { Validators } from './type'
import { login } from './validators/login/login'
import { password } from './validators/password/password'

export const validators: Validators = {
  login,
  password,
}
