/**
 * THE CURATOR - ZERO-MAINTENANCE SERVICE WORKER
 * Strategy: Network-First for Core Assets (HTML/JS/CSS), Cache-First for Media/Fonts
 * Purpose: Guarantee 100% fresh code on every visit, no manual versioning required.
 */

const CACHE_CORE = 'showcase-core-cache-auto';
const CACHE_MEDIA = 'showcase-media-cache-auto';

// Core assets that should always be fetched from the network first
const CORE_ROUTES = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css'
];

// 1. INSTALLATION: Skip waiting to immediately replace any old, broken service workers
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. ACTIVATION: Take immediate control and nuke all legacy caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Wipe everything that isn't our current auto-caches
                    if (cacheName !== CACHE_CORE && cacheName !== CACHE_MEDIA) {
                        console.log('[Service Worker] Eradicating legacy cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); // Take control of all open tabs instantly
        })
    );
});

// 3. FETCH STRATEGY: The Engine of Freshness
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // STRATEGY A: CACHE-FIRST (For external images, fonts, and icons)
    // These rarely change, so caching them saves bandwidth and speeds up load times.
    if (
        requestUrl.hostname.includes('placeholder.com') ||
        requestUrl.hostname.includes('steamstatic.com') ||
        requestUrl.hostname.includes('wikimedia.org') ||
        requestUrl.hostname.includes('unsplash.com') ||
        requestUrl.hostname.includes('fonts.googleapis.com') ||
        requestUrl.hostname.includes('fonts.gstatic.com') ||
        requestUrl.hostname.includes('unpkg.com')
    ) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;

                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_MEDIA).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                }).catch(() => {
                    // Ignore media fetch failures gracefully
                    return new Response('', { status: 404, statusText: 'Offline' });
                });
            })
        );
        return;
    }

    // STRATEGY B: NETWORK-FIRST (For HTML, JS, and CSS)
    // Always go to GitHub Pages to get the absolute newest version. 
    // Only fall back to cache if the network fails (user is offline).
    event.respondWith(
        fetch(event.request).then((networkResponse) => {
            // If the network succeeds, save a backup to the cache
            if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_CORE).then((cache) => {
                    // Clean up old timestamped JS/CSS before adding the new one
                    // This prevents cache storage bloat over time
                    if (requestUrl.pathname.includes('app.js') || requestUrl.pathname.includes('style.css')) {
                        cleanOldTimestampedCaches(cache, requestUrl.pathname);
                    }
                    cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
        }).catch(() => {
            // If offline, attempt to serve from cache
            console.warn('[Service Worker] Network unavailable, serving from cache:', requestUrl.pathname);
            
            // For JS/CSS, we might have a timestamped version in the cache that doesn't 
            // perfectly match the URL requested by the offline HTML. We need to fuzzy match.
            return caches.open(CACHE_CORE).then(cache => {
                return cache.match(event.request, { ignoreSearch: true }).then(cached => {
                    return cached || new Response('Offline Content Not Available', { status: 503 });
                });
            });
        })
    );
});

// Helper function to prevent cache bloating from ?t= timestamps
function cleanOldTimestampedCaches(cache, pathname) {
    cache.keys().then((keys) => {
        keys.forEach((request) => {
            const cachedUrl = new URL(request.url);
            if (cachedUrl.pathname === pathname) {
                cache.delete(request);
            }
        });
    });
}
