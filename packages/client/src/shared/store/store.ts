import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook,
  useStore as useStoreBase,
} from 'react-redux'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../../features/game/model'
import topicsReducer from '../../features/forum/model'
import userReducer from '../../features/userSlice/model'
import logger from 'redux-logger'

declare global {
  interface Window {
    APP_INITIAL_STATE: TRootState
  }
}

export const reducer = combineReducers({
  game: gameReducer,
  // topics: topicsReducer,
  user: userReducer, // demo
})

export const store = configureStore({
  reducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export type TRootState = ReturnType<typeof reducer>
export type TAppDispatch = typeof store.dispatch

export const useDispatch: () => TAppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<TRootState> = useSelectorBase
export const useStore: () => typeof store = useStoreBase
