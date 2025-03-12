const VERSION = "4";
const CACHE_NAME = `admin-bertsio-${VERSION}`;
const APP_STATIC_RESOURCES = [
  "/",
  "/icons/putxera.jpg",
  "/icons/putxera.png",
  "/css/style.css",
  "/admin",
  "/berria",
  "/faseak",
  "/index",
  "/podium",
  "/ezabatu/taldea",
  "/berria/taldea",
  "/berria/txapelketa",
  "/ezabatu/txapelketa",
  "/txapelketak",
  "?",
  "/berria?",
  "/faseak?",
  "/index?",
  "/podium?",
  "/ezabatu/taldea?",
  "/berria/taldea?",
  "/berria/txapelketa?",
  "/ezabatu/txapelketa?",
  "/txapelketak?",
  "/pwa/manifest.json",
  "/sw.js",
  "/js.js",
  "/js/app.js",
  "/js/ebaluazioa.js",
  "/js/epaimahaikidea.js",
  "/js/ebaluazioa.js",
  "/js/ezaugarria.js",
  "/js/fasea.js",
  "/js/konstanteak.js",
  "/js/taldea.js",
  "/js/txapelketa.js",
  "/js/user.js",
  "/pics/atzera.svg",
  "/pics/berria.svg",
  "/pics/birkargatu.svg",
  "/pics/chef.svg",
  "/pics/epaBerria.svg",
  "/pics/epaEzabatu.svg",
  "/pics/epaitu.svg",
  "/pics/ezarpenak.svg",
  "/pics/historia.svg",
  "/pics/mahaia.svg",
  "/pics/menu.svg",
  "/pics/podium.svg",
  "/pics/pot.svg",
  "/pics/profila.svg",
  "/pics/taldeaEzabatu.svg",
  "/pics/taldeBerria.svg",
  "/pics/txapBerria.svg",
  "/pics/txapEzabatu.svg",

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