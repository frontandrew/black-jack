import { router } from './router'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { store } from '../shared/store/store'
import './style.css'

const theme = createTheme()

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
