// ============================================
// Friendnote — Service Worker (Push notifications)
// ============================================

const CACHE_NAME = 'friendnote-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/explorar.html',
  '/login.html',
  '/css/main.css',
  '/css/components.css'
]

// Instalar y cachear recursos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  )
})

// Activar y limpiar caches viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
})

// Interceptar requests — cache first
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached ?? fetch(e.request))
  )
})

// Recibir notificación push
self.addEventListener('push', e => {
  const data = e.data?.json() ?? {}
  e.waitUntil(
    self.registration.showNotification(data.titulo ?? 'Friendnote', {
      body: data.mensaje ?? 'Tienes una nueva notificación',
      icon: '/assets/img/icon-192.png',
      badge: '/assets/img/badge-72.png',
      data: { url: data.url ?? '/' }
    })
  )
})

// Clic en notificación — abrir URL
self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(clients.openWindow(e.notification.data?.url ?? '/'))
})