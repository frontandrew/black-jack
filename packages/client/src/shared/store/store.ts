import { configureStore } from '@reduxjs/toolkit'
import gameReducer from 'features/game/model'
import topicsReducer from 'features/forum/model'
import { authSlice, userSlice } from 'services'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    topics: topicsReducer,
  },
})
