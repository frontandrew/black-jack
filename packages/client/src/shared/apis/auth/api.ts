import { HTTPTransport } from 'transport'
import { APP_HOST } from 'consts'

import type { AuthPayload, AuthResponse } from './type'

export class AuthApi {
  private http = new HTTPTransport(APP_HOST)

  public login(payload: AuthPayload) {
    return this.http.post<AuthPayload, AuthResponse>('/auth/signin', payload)
  }

  public logout() {
    return this.http.post<void, AuthResponse>('/auth/logout')
  }
}
