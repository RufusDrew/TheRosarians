workbox.setConfig({
  debug: false, // Set to true for debugging
});

// Precache static assets
workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' }, // Add URLs of your static files here
  { url: '/styles.css', revision: '1' },
  { url: '/script.js', revision: '1' },
  // Add more static assets as needed
]);

// Cache static files from a specific directory
workbox.routing.registerRoute(
  /\.(?:js|css|html|png|jpg|jpeg|svg|webp)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50, // Adjust as needed
        maxAgeSeconds: 2592000, // 30 days
      }),
    ],
  })
);

// Serve cached files when offline
workbox.routing.registerRoute(
  ({ event }) => event.request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'offline-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50, // Adjust as needed
      }),
    ],
  })
);

// Cache assets with specific HTTP caching headers and validation mechanisms
workbox.routing.registerRoute(
  /\.(?:json|xml)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'http-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200], // Cache successful responses only
        headers: {
          'Cache-Control': 'public, max-age=60', // Cache for 1 minute
          'ETag': 'true', // Enable ETag caching
          'Last-Modified': 'true', // Enable Last-Modified caching
        },
      }),
    ],
  })
);

// Cache Google Fonts using Cache-Control header and validation mechanisms
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        headers: {
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
          'ETag': 'true', // Enable ETag caching
          'Last-Modified': 'true', // Enable Last-Modified caching
        },
      }),
    ],
  })
);
