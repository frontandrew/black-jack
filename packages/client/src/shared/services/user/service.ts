import { UserApi, UserPayload } from 'apis'
import { userSlice as model, getUser } from './model'
import { useDispatch } from 'react-redux'
// import { router } from 'routing'
// import { store } from 'store'

class UserService {
  // private api = new UserApi()

  public async getUser() {
    const { actions, reducer } = model

    const user = getUser()

    user.name
  }
}

export const userServ = new UserService()
