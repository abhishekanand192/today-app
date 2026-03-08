/* ═══════════════════════════════════════════════════════
   Today App — Service Worker
   Strategy: Cache-first for all app assets,
             network-first for future API calls.
═══════════════════════════════════════════════════════ */

const CACHE_NAME = 'today-app-v2';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-180.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-167.png',
  '/icons/icon-152.png',
  '/icons/splash/splash-1290x2796.png',
  '/icons/splash/splash-1179x2556.png',
  '/icons/splash/splash-1170x2532.png',
  '/icons/splash/splash-750x1334.png',
  // Google Fonts — cache the stylesheet + the actual font files
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap',
];

/* ── Install: pre-cache core assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache same-origin assets directly; cross-origin (fonts) with no-cors
      const sameOrigin = PRECACHE_URLS.filter(u => !u.startsWith('http'));
      const crossOrigin = PRECACHE_URLS.filter(u => u.startsWith('http'));

      return Promise.all([
        cache.addAll(sameOrigin),
        ...crossOrigin.map(url =>
          fetch(url, { mode: 'no-cors' })
            .then(res => cache.put(url, res))
            .catch(() => {}) // silently skip if offline at install time
        ),
      ]);
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: remove old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first with network fallback ── */
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For Google Fonts requests — stale-while-revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // For everything else — cache-first
  event.respondWith(cacheFirst(event.request));
});

/* ── Strategies ── */

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return a minimal offline fallback for navigation requests
    if (request.mode === 'navigate') {
      const cached = await caches.match('/index.html');
      if (cached) return cached;
    }
    return new Response('Offline — Today is unavailable right now.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request).then(response => {
    if (response.ok || response.type === 'opaque') {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  return cached || networkFetch;
}
