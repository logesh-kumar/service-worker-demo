var cacheName = "viteapp";
const l = console.log;
/*
 * Once the service worker registration has succeeded and completed, the "install" event is fired.
 * At this stage any service worker previously installed will be in charge.
 * This service worker will not be intercepting any requests at this stage.
 * This event is fired when there is a change in the service worker file.
 */
self.addEventListener("install", function (event) {
  l("install evt");
});

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

/*
 * This is the stage where our service worker becomes active,
 * Intercepting requests and serving pages.
 * The event is fired the first time our service worker becomes active.
 */
self.addEventListener("activate", function (evt) {
  // perform activation tasks here
});

/*
 * This even is fired when a network request is made withni our service worker:
 */
self.addEventListener("fetch", function (event) {
  console.log(event.request?.url);
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(event?.request?.url?.indexOf("http") === 0) ) return; // skip the request. if request is not made with http protocol
  // perform fetching tasks here
  event.respondWith(cacheFirst(event.request));
});


