import { selectUser } from 'features/userSlice/model'
import { Header } from './header'
import { useSelector } from '../../shared/store/store'

export const MainPage = () => {
  const user = useSelector(selectUser)
  return (
    <div>
      <Header />
      {user ? (
        <div>
          <p>{user.name}</p>
          <p>{user.secondName}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  )
}
