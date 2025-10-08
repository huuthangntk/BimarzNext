const CACHE_NAME = 'bimarz-vpn-v2.0.1';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/Lalezar.otf',
  '/Iranian%20Sans.ttf', // Properly encoded space
  '/logo-32.png',
  '/logo-64.png',
  '/logo-128.png',
  '/logo-256.png'
];

// Cache runtime for critical chunks
const RUNTIME_CACHE_URLS = [
  '/assets/js/vendor-critical-',
  '/assets/js/index-'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests and non-GET requests
  if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        // For JavaScript chunks, try runtime caching
        if (event.request.url.includes('/assets/js/')) {
          return caches.open(CACHE_NAME)
            .then(cache => {
              return fetch(event.request)
                .then(fetchResponse => {
                  // Cache successful responses
                  if (fetchResponse.status === 200) {
                    cache.put(event.request, fetchResponse.clone());
                  }
                  return fetchResponse;
                });
            });
        }

        // For other requests, just fetch
        return fetch(event.request);
      })
      .catch(() => {
        // If both cache and network fail, return offline page for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});
