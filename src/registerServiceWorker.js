if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      registration.addEventListener('updatefound', () => {
        // An updated service worker has been found
        const installingWorker = registration.installing;

        installingWorker.addEventListener('statechange', () => {
          // The service worker state has changed
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // A previously installed service worker exists
              console.log('New content is available; please refresh.');

              // Emit a custom event to notify the application
              const event = new CustomEvent('swUpdated', { detail: { updated: true } });
              window.dispatchEvent(event);
            } else {
              // No previous service worker exists, this is the first installation
              console.log('Content is cached for offline use.');
            }
          }
        });
      });
    })
    .catch((error) => {
      // Registration failed
      console.log('ServiceWorker registration failed: ', error);
    });

  // Ensure refresh is only called once
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}
