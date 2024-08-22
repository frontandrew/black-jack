import { IUser, ILoginRequest, IRegistrationRequest } from './type'
import { api } from '../base'
import { BASE } from 'constant'

const authUrl = BASE + '/auth'

export const getUser = (): Promise<IUser | null> => {
  return api.get(`${authUrl}/user`)
}

export const login = (data: ILoginRequest): Promise<unknown> => {
  return api.post(`${authUrl}/signin`, { data })
}

export const registration = (data: IRegistrationRequest): Promise<unknown> => {
  return api.post(`${authUrl}/signup`, { data })
}

export const logout = (): Promise<unknown> => {
  return api.post(`${authUrl}/logout`)
}
