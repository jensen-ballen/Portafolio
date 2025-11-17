// Service Worker para Portfolio Viewer PWA
const CACHE_NAME = 'portfolio-viewer-v1.0.0';
const STATIC_CACHE = 'portfolio-static-v1.0.0';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1.0.0';

// Recursos críticos para cachear
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/css/app.css',
  '/css/bootstrap/bootstrap.min.css',
  '/_framework/blazor.webassembly.js',
  '/_framework/dotnet.js'
];

// Recursos del portafolio para cachear
const PORTFOLIO_ASSETS = [
  '/portfolio/index.html',
  '/portfolio/security.min.js',
  '/portfolio/idioma/translations.js'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('[SW] Caching portfolio assets');
        return cache.addAll(PORTFOLIO_ASSETS);
      })
    ]).then(() => {
      console.log('[SW] All assets cached successfully');
      return self.skipWaiting();
    })
  );
});

// Activar Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
      return self.clients.claim();
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Estrategia Cache First para recursos estáticos
  if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          return caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
  // Estrategia Network First para contenido dinámico
  else if (url.pathname.startsWith('/portfolio/') ||
           url.pathname.includes('api') ||
           request.method !== 'GET') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request).then(cachedResponse => {
          return cachedResponse || new Response(
            JSON.stringify({
              error: 'Offline',
              message: 'Contenido no disponible sin conexión'
            }),
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'application/json' }
            }
          );
        });
      })
    );
  }
  // Estrategia Stale While Revalidate para otros recursos
  else {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          if (networkResponse.ok) {
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, networkResponse.clone());
            });
          }
          return networkResponse;
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});

// Manejar mensajes desde la aplicación principal
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Manejar notificaciones push (para futuras implementaciones)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Background sync para futuras implementaciones
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implementar sincronización en segundo plano si es necesario
  console.log('[SW] Background sync triggered');
}

// Periodic background sync (experimental)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

async function syncContent() {
  // Sincronizar contenido periódicamente
  console.log('[SW] Periodic content sync');
}