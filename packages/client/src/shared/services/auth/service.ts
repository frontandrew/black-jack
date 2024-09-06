import { AuthApi } from 'api'

class AuthService {
  private api = new AuthApi()

  public signOut() {
    this.api.logout()
  }
}

export const authService = new AuthService()
