import { BASE } from 'constant'
import { HTTPTransport } from 'transport'

export class AuthApi {
  private http = new HTTPTransport(BASE)

  public logout() {
    return this.http.post('/auth/logout')
  }
}
