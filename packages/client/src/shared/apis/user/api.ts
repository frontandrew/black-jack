import { HTTPTransport } from 'transport'
import { APP_HOST } from 'consts'

import type {
  UserPassPayload,
  UserPassResponse,
  UserProfilePayload,
  UserRegPayload,
  UserRegResponse,
  UserResponse,
  UserSearchPayload,
} from './type'

export class UserAPI {
  private http = new HTTPTransport(APP_HOST)

  public registration(payload: UserRegPayload) {
    return this.http.post<UserRegPayload, UserRegResponse>(
      '/auth/signup',
      payload
    )
  }

  public getUserData() {
    return this.http.get<void, UserResponse>('/auth/user')
  }

  public setUserData(payload: UserProfilePayload) {
    return this.http.put<UserProfilePayload, UserResponse>(
      '/user/profile',
      payload
    )
  }

  public setUserAvatar(payload: FormData) {
    return this.http.put<FormData, UserResponse>(
      '/user/profile/avatar',
      payload
    )
  }

  public setUserPass(payload: UserPassPayload) {
    return this.http.put<UserPassPayload, UserPassResponse>(
      '/user/password',
      payload
    )
  }

  public searchUserByLogin(payload: UserSearchPayload) {
    return this.http.post<UserSearchPayload, UserResponse[]>(
      '/user/search',
      payload
    )
  }
}
