import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'

import { theme } from '../shared/theme'

import './style.css'
import { router } from './router'

export function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
