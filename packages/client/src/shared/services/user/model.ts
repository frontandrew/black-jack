import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserAPI } from 'apis'
import type { UserType } from './type'
import { formatUserResponse } from './tools'
import { store } from '../../../app'

const initialState: UserType | null = null
const http = new UserAPI()

export const getUser = createAsyncThunk('user/getUser', async function () {
  const response = await http.getUserData()
  console.warn(`USER RESP:`, response)
  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // me: (state, action) => {
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state, { payload }) => {
        // state.loading = false
        state = formatUserResponse(payload)
      })
      .addCase(getUser.pending, state => {
        // state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        // state.user = null;
        // state.loading = false
        // state.errors.push(action.error)
      })
  },
})

// userSlice.actions.
