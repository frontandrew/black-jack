import { StartSW } from './type'

export const startSW: StartSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      navigator.serviceWorker
        .register('sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}
