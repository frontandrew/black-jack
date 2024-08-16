import { useSelector } from '../../shared/store/store'
import { selectUser } from 'features/userSlice/model'
import { Header } from './header'

export const FriendsPage = () => {
  const friends = [{ name: 'Петя', secondName: 'Семенов' }]
  const isLoading = true
  const user = useSelector(selectUser)

  return (
    <div className="App">
      <Header />
      {user ? (
        <>
          <h3>Информация о пользователе:</h3>{' '}
          <p>
            {user.name} {user.secondName}
          </p>
        </>
      ) : (
        <h3>Пользователь не найден</h3>
      )}
      {isLoading ? (
        'Загрузка списка...'
      ) : (
        <ul>
          {friends.map(friend => (
            <li key={friend.name}>
              {friend.name} {friend.secondName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
