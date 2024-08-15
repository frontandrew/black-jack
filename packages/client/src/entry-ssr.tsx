import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'
import { App } from './app'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { fetchUserThunk } from 'features/userSlice/model'
import { reducer } from './shared/store/store'
import { renderToString } from 'react-dom/server'

export const render = async () => {
  const store = configureStore({
    reducer,
  })

  try {
    await store.dispatch(fetchUserThunk())

    const html = renderToString(
      <StrictMode>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    )

    return {
      html,
      initialState: store.getState(),
    }
  } catch (error) {
    console.error('Render error:', error)
    throw error
  }
}
