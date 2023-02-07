const cacheName = 'petstore-v1';
const cacheFiles = [
  'index.html',
  'products.js',
  'petstore.webmanifest',
  // 'images/icon-512.png',
  // 'images/product.png',
  // 'images/product2.png',
  // 'images/product3.png',
  // 'images/product4.jpg',
  // 'images/product5.jpg',
  'images/',
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching all the files');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);

      // 'r' is the matching file if it exists in the cache
      return (
        r ||
        fetch(e.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
