const CACHE_NAME = 'black-jack-v1'

const HTML_PATH = ['index.html']

self.addEventListener('install', event => {
  const addCache = async () => {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(HTML_PATH)
  }
  event.waitUntil(addCache())
})

self.addEventListener('activate', async event => {
  const deleteCache = async () => {
    const cacheNames = await caches.keys()
    return Promise.all(
      cacheNames
        .filter(cacheName => cacheName !== CACHE_NAME)
        .map(cache => caches.delete(cache))
    )
  }
  event.waitUntil(deleteCache())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) response

      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(error => {
          console.log(error)
        })
    })
  )
})
