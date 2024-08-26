import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { store, TRootState } from './shared/store/store'
import { routes } from './routes'
import { FC } from 'react'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { createEmotionCache, themes } from 'themes'
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

const appContainer = document.querySelector('main')
const App: FC = () => {
  const { current } = useSelector((state: TRootState) => state.theme)

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={themes[current]}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CacheProvider>
  )
}

hydrateRoot(
  appContainer as HTMLElement,
  <Provider store={store}>
    <App />
  </Provider>
)
