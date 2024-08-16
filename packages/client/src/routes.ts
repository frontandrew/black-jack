import { MainPage } from './pages/demo/main'
import { FriendsPage } from './pages/demo/friend'
import { NotFoundPage } from './pages/demo/404'

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
} from './pages'

export const routes = [
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '*',
    Component: ErrorPage,
  },
  {
    path: 'sign-in',
    Component: LoginPage,
  },
  {
    path: 'sign-up',
    Component: RegPage,
  },
  {
    path: 'settings',
    Component: SettingsPage,
  },
  {
    path: 'start',
    Component: StartPage,
  },
  {
    path: 'game',
    Component: GamePage,
  },
  {
    path: 'finish',
    Component: FinishPage,
  },
  {
    path: 'leaderboard',
    Component: LeaderPage,
  },
  {
    path: 'forum',
    Component: ForumPage,
  },
  {
    path: 'forum/:id',
    Component: TopicPage,
  },
]
