import { UserApi } from 'api'

class UserService {
  private api = new UserApi()

  public async getUser() {
    return this.api.getUserData()
  }
}

export const userService = new UserService()
