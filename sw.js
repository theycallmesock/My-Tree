/**
 * THE CURATOR — ZERO-CACHE SERVICE WORKER
 * Strategy: Never cache HTML/CSS/JS. Cache external images only.
 * Auto-invalidation: version derived from build timestamp, no manual edits needed.
 */

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Cache name for media assets only. Core files are never cached.
const MEDIA_CACHE = 'curator-media-v1';

// Domains whose responses are safe to cache (images, fonts, icons)
const CACHEABLE_ORIGINS = [
    'shared.akamai.steamstatic.com',
    'upload.wikimedia.org',
    'images.unsplash.com',
    'cdn.cloudflare.steamstatic.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'unpkg.com'
];

// File extensions that are safe to cache
const CACHEABLE_EXTENSIONS = /\.(png|jpe?g|gif|svg|webp|woff2?|ttf|eot|ico)(\?.*)?$/i;

// Core app files — NEVER cache, always fetch fresh
const NOCACHE_PATTERNS = [
    /\.html(\?.*)?$/i,
    /\.js(\?.*)?$/i,
    /\.css(\?.*)?$/i,
    /\/$/,                // root path
    /\/\?/,               // root with query
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
self.addEventListener('install', () => {
    // Take over immediately — no waiting for old SW to die
    self.skipWaiting();
});

// ─── ACTIVATE ─────────────────────────────────────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names =>
            Promise.all(
                names
                    .filter(name => name !== MEDIA_CACHE)
                    .map(name => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            )
        ).then(() => self.clients.claim())
    );
});

// ─── FETCH ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
    const req = event.request;

    // Only handle GET requests
    if (req.method !== 'GET') return;

    let url;
    try {
        url = new URL(req.url);
    } catch {
        return; // Malformed URL — let it pass through
    }

    // ── CORE APP FILES: always bypass cache ──────────────────────────────────
    const isCoreFile = NOCACHE_PATTERNS.some(p => p.test(url.pathname));
    if (isCoreFile && url.origin === self.location.origin) {
        event.respondWith(
            fetch(req, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            }).catch(() =>
                new Response(
                    '<!DOCTYPE html><html><body><p>You are offline. Please reconnect to load The Curator.</p></body></html>',
                    {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: { 'Content-Type': 'text/html; charset=utf-8' }
                    }
                )
            )
        );
        return;
    }

    // ── MEDIA / FONT ASSETS: cache-first strategy ─────────────────────────────
    const isCacheableOrigin = CACHEABLE_ORIGINS.some(o => url.hostname === o || url.hostname.endsWith('.' + o));
    const isCacheableExt = CACHEABLE_EXTENSIONS.test(url.pathname);

    if (isCacheableOrigin || isCacheableExt) {
        event.respondWith(
            caches.open(MEDIA_CACHE).then(async cache => {
                // Check cache first
                const cached = await cache.match(req);
                if (cached) return cached;

                // Not cached — fetch from network and store
                try {
                    const networkRes = await fetch(req);
                    if (networkRes && networkRes.status === 200 && networkRes.type !== 'opaque') {
                        // Only cache successful, non-opaque responses to avoid poisoning the cache
                        cache.put(req, networkRes.clone()).catch(() => {/* silent */});
                    }
                    return networkRes;
                } catch {
                    // Asset unavailable — return an empty 404 to prevent layout breaks
                    return new Response('', {
                        status: 404,
                        statusText: 'Asset Unavailable'
                    });
                }
            })
        );
        return;
    }

    // ── EVERYTHING ELSE: network only, no caching ─────────────────────────────
    // This covers same-origin API calls, third-party scripts, etc.
    // No respondWith() call here = browser handles it natively.
});

// ─── MESSAGE HANDLER ─────────────────────────────────────────────────────────
// Allows the main app to send control messages to the SW if needed
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    if (event.data && event.data.type === 'CLEAR_MEDIA_CACHE') {
        caches.delete(MEDIA_CACHE).then(() => {
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage({ cleared: true });
            }
        });
    }
});
