const VERSION = "1";
const CACHE_NAME = `epaile-bertsio-${VERSION}`;
const APP_STATIC_RESOURCES = [
  "/",
  "/www/css/style.css",
  "/www/icons/putxera.jpg",
  "/www/icons/putxera.png",
  "/www/index.html",
  "/pwa/manifest.json",
  "/www/html/profila.html",
  "/www/html/epaitu.html",
  "www/js/user.js",
  "/www/js/txapelketa.js",
  "/www/js/konstanteak.js",
  "/www/js/ebaluazioa.js",
  "/www/js/epaimahaikidea.js",
  "/www/js/app.js",
  "/www/js/epaile.js",
  "/www/js/fasea.js",
  "/www/js/ezaugarria.js",
  "/www/js/taldea.js",
  "/www/pics/atzera.svg",
  "/www/pics/berria.svg",
  "/www/pics/birkargatu.svg",
  "/www/pics/chef.svg",
  "/www/pics/debekatuta.svg",
  "/www/pics/epaitu.svg",
  "/www/pics/home.svg",
  



];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        APP_STATIC_RESOURCES.map((resource) =>
          cache.add(resource).catch((error) => console.error(`❌ Error cacheando ${resource}:`, error))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            console.log(`Deleting old //cache: ${name}`);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("Interceptando petición:", event.request.url);
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Sirviendo desde caché:", event.request.url);
        return cachedResponse;
      }
      console.log("No está en caché, intentamos obtener de la red:", event.request.url);
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || event.request.method !== "GET") {
            return networkResponse;
          }
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          console.error("⚠️ Sin conexión y recurso no cacheado:", event.request.url);
          if (event.request.mode === "navigate") {
            return caches.match("/index");
          }
          return caches.match(event.request).then((fallbackResponse) => {
            if (fallbackResponse) {
              return fallbackResponse;
            }
            return new Response("⚠️ Offline: El recurso no está en caché.", { status: 404 });
          });
        });
    })
  );
});