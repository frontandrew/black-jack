import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserAPI } from 'apis'

import type { UserState } from './type'
import { formatUserResponse } from './tools'

const initialState: UserState = {
  user: null,
  isLoading: true,
  errors: [],
}
const api = new UserAPI()

export const getUser = createAsyncThunk(
  'user/data',
  async () => await api.getUserData()
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = formatUserResponse(payload)
        state.isLoading = false
      })
      .addCase(getUser.pending, state => {
        state.isLoading = true
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null
        state.isLoading = false
        state.errors.push(action.error)
      })
  },
})
