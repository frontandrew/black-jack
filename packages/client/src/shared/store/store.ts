import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook,
  useStore as useStoreBase,
} from 'react-redux'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './game/gameSlice'
import topicsReducer from './forum/topicsSlice'
import friendsReducer from '../store/demo/friendsSlice'
import ssrReducer from '../store/ssr/ssrSlice'
import userReducer from '../store/demo/userSlice'
import { themeSlice } from './theme'

declare global {
  interface Window {
    APP_INITIAL_STATE: TRootState
  }
}

export const reducer = combineReducers({
  game: gameReducer,
  topics: topicsReducer,
  friends: friendsReducer, // demo
  ssr: ssrReducer,
  user: userReducer, // demo
  theme: themeSlice.reducer,
})

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type TRootState = ReturnType<typeof reducer>
export type TAppDispatch = typeof store.dispatch

export const useDispatch: () => TAppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<TRootState> = useSelectorBase
export const useStore: () => typeof store = useStoreBase
