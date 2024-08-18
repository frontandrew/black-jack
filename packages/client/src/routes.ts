import { MainPage } from './pages/demo/main'
import { FriendsPage } from './pages/demo/friend'
import { TAppDispatch, TRootState } from 'shared/store/store'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: TAppDispatch
  state: TRootState
  ctx: PageInitContext
}

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
    path: '/demo',
    Component: MainPage,
  },
  {
    path: '/friends',
    Component: FriendsPage,
  },
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
