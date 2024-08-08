import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store/index'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import './style.css'

export const router = createBrowserRouter(routes)

export const App = () => {
  const theme = createTheme()
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

// register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    } catch (error) {
      console.log('ServiceWorker failed: ', error)
    }
  })
}

hydrateRoot(
  document.querySelector('main') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
)
