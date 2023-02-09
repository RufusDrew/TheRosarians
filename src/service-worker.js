/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

// eslint-disable-next-line no-undef
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

// eslint-disable-next-line no-undef
importScripts("/precache-manifest.76409a00efed48aaf984d76d4625dc72.js");

// eslint-disable-next-line no-undef
workbox.skipWaiting();
// eslint-disable-next-line no-undef
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// eslint-disable-next-line no-undef
workbox.precaching.suppressWarnings();
// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// eslint-disable-next-line no-undef
workbox.routing.registerNavigationRoute("/index.html", {
  blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
});
/* eslint-disable */
function handleVersion(event) {
  event.source.postMessage({ event: "version", value: 101 });
}

self.addEventListener("message", function (event) {
  switch (event.data.event) {
    case "version":
      handleVersion(event);
      break;
    default:
      break;
  }
});

self.onnotificationclick = function (event) {
  event.notification.close();
  var data = event.notification.data;

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        if (!data) {
          return;
        }

        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (!client.focus || !client.url) {
            return;
          }
          if (data.url) {
            if (client.url === data.url) {
              return client.focus();
            }
          } else if (data.indexOf) {
            if (client.url.indexOf(data.indexOf) === 0) {
              return client.focus();
            }
          } else if (data.regex) {
            const regex = new RegExp(data.regex[0], data.regex[1]);
            if (regex.test(client.url)) {
              return client.focus();
            }
          }
        }

        if (data.open && clients.openWindow) {
          return clients.openWindow(data.open);
        }
      })
  );
};
