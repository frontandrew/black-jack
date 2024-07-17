import { AuthApi, AuthPayload } from 'apis'
import { authSlice, checkAuth } from './model'
import { useDispatch } from 'react-redux'
// import { router } from 'routing'
// import { store } from 'store'

class AuthService {
  // private api = new AuthApi()

  public async singIn(data: AuthPayload): Promise<void> {
    const { reducer, actions } = authSlice
    const dispatch = useDispatch()

    const user = checkAuth()

    // if (user.)

    // const isAuth = await this.api
    //   .login(data)
    //   .then(response => response === 'OK')
    //   .catch(() => false)
    // const { signIn } = actions
    // actions
  }

  public signOut() {
    this.api.logout()
  }
}

export const authServ = new AuthService()
