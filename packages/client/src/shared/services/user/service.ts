import { getUser } from './model'
import { store } from '../../../app'

class UserService {
  public async getUser() {
    store.dispatch(getUser())
  }
}
export const userServ = new UserService()
