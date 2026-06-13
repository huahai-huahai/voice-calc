// 买菜算账 - Service Worker (离线缓存)
var CACHE = 'voice-calc-v2';

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        './index.html',
        './manifest.json',
        './icon.svg'
      ]);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    fetch(e.request).catch(function () {
      return caches.match(e.request);
    })
  );
});
