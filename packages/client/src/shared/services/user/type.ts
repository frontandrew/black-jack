export interface UserType {
  id: number
  avatar: string
  email: string
  login: string
  firstName: string
  secondName: string
  nickName: string
  phone: string
}

export interface RegUserType
  extends Omit<UserType, 'id' | 'nickName' | 'avatar'> {
  password: string
}

export type ProfileUserType = Omit<UserType, 'id' | 'avatar'>

export interface PassUserType {
  passCurr: string
  passNew: string
  passNewMore: string
}

export interface UserState {
  user: UserType | null
  isLoading: boolean
  errors: unknown[]
}
