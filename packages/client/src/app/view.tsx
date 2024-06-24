import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom'
import { useEffect } from 'react'
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
} from '../pages'
import { theme } from '../shared/theme'

import './style.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'sign-in',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'sign-up',
    element: <RegPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'settings',
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'start',
    element: <StartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'game',
    element: <GamePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'finish',
    element: <FinishPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'leaderboard',
    element: <LeaderPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'forum',
    element: <ForumPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'forum/:forumId',
    element: <ForumPage />,
    errorElement: <ErrorPage />,
  },
])

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
