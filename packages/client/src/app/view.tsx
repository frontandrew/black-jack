import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'

import { theme } from '../shared/theme'

import './style.css'
import {
  ErrorPage,
  FinishPage,
  ForumPage,
  GamePage,
  LandingPage,
  LeaderPage,
  LoginPage,
  RegPage,
  SettingsPage,
  StartPage,
} from '../pages'
import { ErrorBoundary } from '../pages/error'

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
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="sign-in" element={<LoginPage />} />
            <Route path="sign-up" element={<RegPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="start" element={<StartPage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="finish" element={<FinishPage />} />
            <Route path="leaderboard" element={<LeaderPage />} />
            <Route path="forum" element={<ForumPage />} />
            <Route path="forum/:forumId" element={<ForumPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
