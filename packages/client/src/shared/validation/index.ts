import { Validators } from './type'
import { email } from './validators/email/email'
import { login } from './validators/login/login'
import { name } from './validators/name/name'
import { password } from './validators/password/password'
import { phone } from './validators/phone/phone'

export const validators: Validators = {
  login,
  password,
  phone,
  email,
  name,
}
