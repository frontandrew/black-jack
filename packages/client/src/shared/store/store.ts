import { configureStore } from '@reduxjs/toolkit'
import gameReducer from 'features/game/model'
import topicsReducer from 'features/forum/model'
import { authSlice, userSlice } from 'services'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    topics: topicsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
})
