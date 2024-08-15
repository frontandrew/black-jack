import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './style.css'

// demo
import { Provider } from 'react-redux'
import { useSelector } from '../shared/store/store'
import { selectUser } from 'features/userSlice/model'

export function App() {
  const theme = createTheme()
  // return (
  //   <ThemeProvider theme={theme}>
  //     12123213
  //     {/* <RouterProvider router={router} /> */}
  //   </ThemeProvider>
  // )

  // demo
  const user = useSelector(selectUser)
  return (
    <div>
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
