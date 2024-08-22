export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface ILoginRequest {
  login: string
  password: string
}

export interface IRegistrationRequest {
  first_name: string
  second_name: string
  email: string
  phone: string
  login: string
  password: string
}
