import { CssBaseline } from '@mui/material'
import ReactDOM from 'react-dom/client'
import React from 'react'

import { App } from './app'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'

ReactDOM.createRoot(document.querySelector('main') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)
