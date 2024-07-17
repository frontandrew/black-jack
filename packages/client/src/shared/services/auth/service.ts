import { AuthApi, AuthPayload } from 'apis'
// import { router } from 'routing'
// import { store } from 'store'

class AuthService {
  private api = new AuthApi()

  public async singIn(data: AuthPayload): Promise<void> {
    const isAuth = await this.api
      .login(data)
      .then(response => response === 'OK')
      .catch(() => false)

    /**
     * TODO: set global store auth state
     * TODO: pull user request
     */
  }

  public signOut() {
    this.api.logout()
  }
}

export const authServ = new AuthService()
