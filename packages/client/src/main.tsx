import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { hydrateRoot } from 'react-dom/client'
import { App } from './app'

hydrateRoot(
  document.querySelector('main') as HTMLElement,
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)
