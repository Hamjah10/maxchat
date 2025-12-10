// MaxChat Service Worker
const CACHE_NAME = "maxchat-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./login.html",
  "./manifest.json"
];

// Install the service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Network First Strategy (Critical for Chat Apps)
// We try to get data from the internet first. If offline, use cache.
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});