import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Themes, ThemeState } from './type'

const initialState: ThemeState = {
  user: null,
  current: Themes.Light,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<Themes>) {
      state.current = payload
    },
  },
})
