import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from '../shared/theme'

import './style.css'
import { router } from './router'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
