import { hydrateRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { StrictMode } from 'react'

import { App } from './app'

hydrateRoot(
  document.querySelector('main') as HTMLElement,
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
)
