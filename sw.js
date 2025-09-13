const CACHE_NAME = 'todo-app-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// Instalar y cachear assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(' Cache abierto, añadiendo assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Estrategia offline-first con fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Devuelve desde cache si existe, sino busca online
      return response || fetch(event.request).catch(() => {
        // Fallback a index.html para navegación offline
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('Recurso no disponible offline', {
          status: 404,
          statusText: 'Not Found'
        });
      });
    })
  );
});

// Limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Cache viejo eliminado:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
