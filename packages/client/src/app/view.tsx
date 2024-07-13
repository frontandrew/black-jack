import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material'

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
  TopicPage,
  AddTopicModal,
} from 'pages'
import { theme } from 'theme'

import './style.css'
import { Provider } from 'react-redux'
import { store } from './store'

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
            <Route path="forum/:id" element={<TopicPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}
