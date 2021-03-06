importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
console.log('service worker is loaded...');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  //This is now outdated!!! please use a nice bundler like webpack instead!
  workbox.precaching.precacheAndRoute([
    'index.html'
  ]);

  workbox.routing.registerRoute(
    /\.js$/,
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );
  
  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}