import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'

import { App, store } from './app'
import './index.css'

ReactDOM.createRoot(document.querySelector('main') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
