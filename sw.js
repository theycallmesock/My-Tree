/**
 * THE CURATOR - AGGRESSIVE ZERO-CACHE SERVICE WORKER
 * Strategy: NO CACHE for HTML/CSS/JS. Only cache external images to save bandwidth.
 * Purpose: Guarantee 100% fresh code on every single visit automatically.
 */

const CACHE_MEDIA = 'showcase-media-cache-v1';

// 1. INSTALLATION: Take over instantly
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. ACTIVATION: Nuke any legacy core caches that might have trapped older versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Wipe any old cache that is NOT the current media cache
                    if (cacheName !== CACHE_MEDIA) {
                        console.log('[Service Worker] Eradicating cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); 
        })
    );
});

// 3. FETCH STRATEGY: Bypass cache for logic, cache images only.
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // If it is an HTML, CSS, or JS file (Core Logic), FORCE NETWORK ONLY
    // We add cache: 'no-store' to explicitly forbid the browser from answering with cache
    if (
        requestUrl.pathname.endsWith('.html') || 
        requestUrl.pathname.endsWith('.js') || 
        requestUrl.pathname.endsWith('.css') ||
        requestUrl.pathname === '/'
    ) {
        event.respondWith(
            fetch(event.request, { cache: 'no-store' }).catch(() => {
                // If offline, just return a fake 503 response. It's a static site, so it requires internet to fetch fresh JS.
                return new Response('Network required to load site.', { status: 503 });
            })
        );
        return;
    }

    // STRATEGY: CACHE-FIRST (For external images, fonts, and icons only)
    if (
        requestUrl.hostname.includes('placeholder.com') ||
        requestUrl.hostname.includes('steamstatic.com') ||
        requestUrl.hostname.includes('wikimedia.org') ||
        requestUrl.hostname.includes('unsplash.com') ||
        requestUrl.hostname.includes('fonts.googleapis.com') ||
        requestUrl.hostname.includes('fonts.gstatic.com') ||
        requestUrl.hostname.includes('unpkg.com') ||
        requestUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)
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
                    // Fail gracefully on images
                    return new Response('', { status: 404, statusText: 'Offline' });
                });
            })
        );
    }
});
