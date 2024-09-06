import { BASE } from 'constant'
import { HTTPTransport } from 'transport'

export class UserApi {
  private http = new HTTPTransport(BASE)

  public getUserData() {
    return this.http.get('auth/user')
  }
}
