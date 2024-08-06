import { StrictMode } from 'react'
import { CssBaseline } from '@mui/material'
import { renderToString } from 'react-dom/server'
import { App } from './app'

export const render = () =>
  renderToString(
    <StrictMode>
      <CssBaseline />
      <App />
    </StrictMode>
  )
