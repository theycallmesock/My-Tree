/**
 * THE CURATOR — Dynamic Service Worker
 * Always fetches the latest version from the network first.
 * No manual version bumping required.
 */

const CACHE_NAME = 'curator-dynamic-cache';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, chrome-extension, and external API requests
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // NETWORK FIRST, CACHE FALLBACK STRATEGY
  event.respondWith(
    fetch(request)
      .then(response => {
        // Network succeeded: silently update the cache with the newest version
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        // Network failed (user is offline): serve from cache
        return caches.match(request)
          .then(cached => {
            if (cached) return cached;
            // Offline fallback: return index.html for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
