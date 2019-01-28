# pwa-weather-app
Example React based weather app with two different service worker implementations.

The master branch contains the basic react based weather app without any PWA caching features.

Branch plain-sw contains a service worker caching implementatioin without any libraries. Here only precaching strategy is implemented.

Branch workbox-sw contains a service worker implementation with Google workbox library https://developers.google.com/web/tools/workbox/
This implementation uses precaching and runtime caching with network-first strategy for javascript files and weather API calls. 


## How to use

Clone the repository, go to the folder where you cloned it and then install dependencies
```console
npm install
```

Note! You must modify the parameters.json file to contain a valid API key from openweathermap.org. 
The one found from the repository is only an example and invalid.

Next you need to execute webpack to create the bundle files
```console
npx webpack
```

And finally start http-server to run the application locally
```console
npx http-server -c0
```

