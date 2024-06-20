import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'

import { LandingPage, LoginPage } from '../pages'
import { theme } from '../shared/theme'

import './style.css'

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="sign-in" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
