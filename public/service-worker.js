importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.precaching.precacheAndRoute([        
        { url: '/', revision: '1' },
        { url: '/index.html', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        new RegExp('.*\.js'),
        workbox.strategies.networkFirst()
    );

    workbox.routing.registerRoute(
        new RegExp('^https://api.openweathermap.org/data/2.5/weather'),
        workbox.strategies.networkFirst({
            cacheName: 'weatherApi',
            plugins: [
                new workbox.expiration.Plugin({                    
                    maxAgeSeconds: 5 * 60, // 5 minutes
                }),
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}