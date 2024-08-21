import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { store } from './shared/store/store'
import { routes } from './routes'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache, lightTheme } from 'themes'
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
const styleCache = createEmotionCache()

hydrateRoot(
  document.querySelector('main') as HTMLElement,
  <>
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </>
)
