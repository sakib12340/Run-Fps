const CACHE_NAME = 'runfps-v9';

const PRECACHE_URLS = [
  '/en/',
  '/en/calculator/',
  '/en/optimizer/',
  '/en/bottleneck/',
  '/en/games/',
  '/en/about/',
  '/en/contact/',
  '/en/privacy/',
  '/en/terms/',
  '/en/methodology/',
  '/en/compare/',
  '/en/faq/',
  '/en/benchmarks/gpu/',
  '/en/benchmarks/cpu/',
  '/de/',
  '/de/calculator/',
  '/de/optimizer/',
  '/de/bottleneck/',
  '/de/games/',
  '/de/about/',
  '/de/contact/',
  '/de/privacy/',
  '/de/terms/',
  '/de/methodology/',
  '/de/compare/',
  '/de/faq/',
  '/de/benchmarks/gpu/',
  '/de/benchmarks/cpu/',
  '/fr/',
  '/fr/calculator/',
  '/fr/optimizer/',
  '/fr/bottleneck/',
  '/fr/games/',
  '/fr/about/',
  '/fr/contact/',
  '/fr/privacy/',
  '/fr/terms/',
  '/fr/methodology/',
  '/fr/compare/',
  '/fr/faq/',
  '/fr/benchmarks/gpu/',
  '/fr/benchmarks/cpu/',
  '/es/',
  '/es/calculator/',
  '/es/optimizer/',
  '/es/bottleneck/',
  '/es/games/',
  '/es/about/',
  '/es/contact/',
  '/es/privacy/',
  '/es/terms/',
  '/es/methodology/',
  '/es/compare/',
  '/es/faq/',
  '/es/benchmarks/gpu/',
  '/es/benchmarks/cpu/',
  '/pt/',
  '/pt/calculator/',
  '/pt/optimizer/',
  '/pt/bottleneck/',
  '/pt/games/',
  '/pt/about/',
  '/pt/contact/',
  '/pt/privacy/',
  '/pt/terms/',
  '/pt/methodology/',
  '/pt/compare/',
  '/pt/faq/',
  '/pt/benchmarks/gpu/',
  '/pt/benchmarks/cpu/',
  '/engine.js',
  '/images/bg-pattern.svg',
  '/fonts/SpaceGrotesk-Variable.woff2',
  '/fonts/JetBrainsMono-Variable.woff2',
  '/fonts/Inter-400.woff2',
  '/fonts/Inter-500.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: 'reload' })))
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network-first for HTML navigations — always get fresh pages
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // engine.js is version-critical — always try the network first so fixes
  // reach users without requiring a hard refresh, with cache as fallback.
  if (url.pathname === '/engine.js') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});
