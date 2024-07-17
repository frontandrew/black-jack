import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { theme } from 'theme'

import { userServ, getUser } from 'services'

import { router } from './router'
import { RootState } from './store'
import './style.css'

export function App() {
  // const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    userServ.getUser()
    console.log('APP:', { user })
  }, [])
  return (
    // <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    // </Provider>
  )
}
