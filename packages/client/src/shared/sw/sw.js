const CHECK_ONLINE = 'check-online'

const VERSION = '0.1';

const STATIC_CACHE_NAME = `static-black-jack-v-${VERSION}`
const DYNAMIC_CACHE_NAME = `dynamic-black-jack-v-${VERSION}`

const HTML_PATH = 'index.html'

const ASSET_URLS = [HTML_PATH]

self.addEventListener('install', async event => {

  const addCache = async () => {
    const cache = await caches.open(STATIC_CACHE_NAME)
    return cache.addAll(ASSET_URLS)
  }
  event.waitUntil(addCache())
})

self.addEventListener('activate', async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(cacheName => cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME)
      .map(cacheName => caches.delete(cacheName))
  )
})

self.addEventListener('fetch', async event => {
  const { request } = event;

  const url = new URL(request.clone().url);

  const isCheckOnlineParam = url.searchParams.get(CHECK_ONLINE);

  if (isCheckOnlineParam) {
    event.respondWith(fetch(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

const networkFirst = async (request) => {
  const fetchRequest = await request.clone();
  const cache = await caches.open(DYNAMIC_CACHE_NAME);

  try {
    const response = await fetch(fetchRequest);
    await cache.put(request, response.clone());

    return response;
  } catch (e) {
    const cached = await caches.match(request);

    if (cached) {
      return cached;
    }

    const cache = await caches.open(STATIC_CACHE_NAME);

    return await cache.match(HTML_PATH);
  }
}
