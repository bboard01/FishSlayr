/* FishSlayR service worker — offline app shell caching.
   index.html is intentionally NOT pre-cached and is always network-first,
   so new deploys show up on the next online load without a version bump.
   Bump CACHE_VERSION only when you change the icons/manifest asset list. */
const CACHE_VERSION = 'fishslayr-v1.3.0';
const ASSETS = [
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png'
];

// Install: pre-cache the static app shell (no HTML), activate immediately.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: drop every old cache bucket, take control of open pages.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const isHTML = (req) =>
  req.mode === 'navigate' ||
  /\/(index\.html)?(\?.*)?$/.test(new URL(req.url).pathname) ||
  (req.headers.get('accept') || '').includes('text/html');

// Fetch: network-first for the HTML shell (always fresh when online,
// falls back to last-seen copy offline); cache-first for static assets.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (isHTML(req)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});
