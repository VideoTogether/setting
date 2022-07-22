// we don't need this polyfill, but the first sw demo I found uses this. So...
// Dose anyone can remove this?
self.importScripts('./serviceworker-cache-polyfill.js');

var urlsToCache = [
    '/',
    '/index.html'
];

var CACHE_NAME = 'VideoTogetherSettingV2';

self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});


self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['counterxing'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
