import { router } from './router'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { store } from './store'
import { theme } from 'theme'
import './style.css'

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       await navigator.serviceWorker
//         .register('/sw.js')
//         .then(registration => {
//           console.log(
//             'ServiceWorker registration successful with scope: ',
//             registration.scope
//           )
//         })
//         .catch((error: string) => {
//           console.log('ServiceWorker registration failed: ', error)
//         })
//     } catch (error) {
//       console.log('ServiceWorker failed: ', error)
//     }
//   })
// }
