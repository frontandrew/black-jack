import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'

import { theme } from '../shared/theme'

import './style.css'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './store'

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}
