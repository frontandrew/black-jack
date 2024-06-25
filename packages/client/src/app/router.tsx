import { createBrowserRouter } from 'react-router-dom'
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

export const router = createBrowserRouter([
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
