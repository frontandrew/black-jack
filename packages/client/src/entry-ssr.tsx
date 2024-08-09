import { renderToString } from 'react-dom/server'
import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'

import { App } from './app'

export const render = () =>
  renderToString(
    <StrictMode>
      <CssBaseline />
      <App />
    </StrictMode>
  )
