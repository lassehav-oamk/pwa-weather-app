var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
    '/',
    '/index.html',
    '/js/bundle.js'
];

self.addEventListener('install', function (event) {
    console.log('Service worker installing');
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Service worker opened cache ' + CACHE_VERSION);
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('activate service worker');
    console.log(event);
});

self.addEventListener('fetch', function (event) {
    console.log('Service worker fetch url: ' + event.request.url);
    event.respondWith(
        // Open the correct version of the cache 
        caches.open(CACHE_VERSION).then(function (cache) {
            // Try to find a match for our request 
            return cache.match(event.request).then(response => {
                if (response) // match found, return that as a response
                {
                    console.log('cache match for fetch');
                    return response;
                }
                else // match not found, try to fetch the resource from the network (or browser cache)
                {
                    console.log('No cache match')
                    return fetch(event.request);
                }
            })
            // Catch the error created if no network connection availble
            .catch(function () {
                // If the request was of an .html file, then return small html error snipper as a response
                if (event.request.url.endsWith('.html')) {
                    return new Response('<p>Network offline and resource not in cache, sorry pal!</p>', {
                        headers: { 'Content-Type': 'text/html' }
                    });
                }
                else // return null for all other file types than .html
                {
                    return null;
                }
            })
        })
    );

    /* Update the cache */
    /*event.waitUntil(
        caches.open(CACHE_VERSION).then(function (cache) {
          return fetch(event.request).then(function (response) {
            return cache.put(event.request, response);
          });
        }));*/
});