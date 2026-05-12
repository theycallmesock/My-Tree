/**
 * SHOWCASE PLATFORM - SERVICE WORKER
 * Version: 3.0.0
 * Purpose: Offline capabilities, aggressive caching for assets, and instant updates.
 */

const CACHE_NAME = 'showcase-cache-v3.0.0';

// Assets to cache immediately on first load
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap',
    'https://unpkg.com/@phosphor-icons/web'
];

// 1. Install Event: Pre-cache core assets
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force the waiting service worker to become the active service worker
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching core assets');
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
});

// 2. Activate Event: Clean up old caches (Crucial for GitHub Pages updates)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); // Take control of all open pages immediately
        })
    );
});

// 3. Fetch Event: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests unless they are our fonts/icons
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.includes('fonts') && 
        !event.request.url.includes('unpkg')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Update the cache with the fresh network response
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If network fails (offline), and we have no cache, return offline fallback if needed
                console.warn('[Service Worker] Fetch failed, serving from cache if available.');
            });

            // Return cached response immediately, then silently update in background
            return cachedResponse || fetchPromise;
        })
    );
});
