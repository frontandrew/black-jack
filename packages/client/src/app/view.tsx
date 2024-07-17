import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from 'theme'

import './style.css'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './store'
import { startSW } from '../shared/sw/index'

startSW()

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}
