import { UserAPI, UserPayload } from 'apis'
import { userSlice, getUser } from './model'
// import { router } from 'routing'
import { store } from '../../../app'
import { authServ } from '../auth'

class UserService {
  private api = new UserAPI()

  /** Как дернуть этот метод */
  public async getUser() {
    const { actions, reducer } = userSlice
    // console.log(`USER MODEL`, { slice: userSlice, state: store.getState() })
    // store.dispatch(getUser())
  }
}
export const userServ = new UserService()

userServ.getUser()
