importScripts('./firebasejs/firebase-app.js');
importScripts('./firebasejs/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '83284008014'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  let notificationTitle = 'Background Message Title';
  let notificationOptions = {
    body: 'Background Message body.',
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});



var CACHE_NAME = 'pwa-push-test-caches';
var urlsToCache = ['./index.html','./firebasejs/firebase-app.js','./firebasejs/firebase-messaging.js'];



self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});