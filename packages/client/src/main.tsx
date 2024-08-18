import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { store } from './shared/store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './style.css'

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

const router = createBrowserRouter(routes)
const theme = createTheme()

hydrateRoot(
  document.querySelector('main') as HTMLElement,
  <>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </>
)
