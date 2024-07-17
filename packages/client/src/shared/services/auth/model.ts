import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthApi, UserAPI, AuthPayload } from 'apis'
import type { AuthState } from './type'

const initialState: AuthState = { isAuth: false }
const http = {
  auth: new AuthApi(),
  user: new UserAPI(),
}

export const checkAuth = createAsyncThunk(
  'isAuth/checkAuth',
  async function () {
    const response = await http.user.getUserData()

    return response
  }
)

export const authSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    signIn(state) {
      state.isAuth = true
    },
    signOut(state) {
      state.isAuth = false
    },
  },

  /** НЕ МОГУ ПОНЯТЬ ПОЧЕМУ STATE И ACTION <any> */
  extraReducers: {
    [checkAuth.pending]: (state, action) => {
      const res = state.isAuth
    },
  },
})
