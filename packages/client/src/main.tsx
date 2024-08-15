import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { App } from './app'
import { store } from './shared/store/store'

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
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
