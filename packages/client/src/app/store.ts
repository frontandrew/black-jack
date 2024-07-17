import { configureStore } from '@reduxjs/toolkit'
import gameReducer from 'features/game/model'
import { authSlice, userSlice } from 'services'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
