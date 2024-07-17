import { configureStore } from '@reduxjs/toolkit'
import gameReducer from 'features/game/model'
import topicsReducer from 'features/forum/model'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    topics: topicsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
