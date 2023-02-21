
/* eslint-disable no-undef */

//This is how you can use the network first strategy for files ending with .js
workbox.routing.registerRoute(/.*\.js/, workbox.strategies.networkFirst());

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting()
    }
  });


// Use cache but update cache files in the background ASAP
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-cache',
  })
);
workbox.routing.registerRoute(
  /.*\.js/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css-js',
  })
);

//Cache first, but defining duration and maximum files

//Cache first, but defining duration and maximum files
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);



workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  })
);
