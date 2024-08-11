import { configureStore } from '@reduxjs/toolkit'
import gameReducer from 'features/game/model'
import topicsReducer from 'features/forum/model'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    topics: topicsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
