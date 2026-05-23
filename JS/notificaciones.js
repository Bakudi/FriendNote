// ============================================
// Friendnote — Módulo de notificaciones push
// ============================================

// Registrar service worker y pedir permiso
export async function iniciarNotificaciones() {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    console.log('Notificaciones no soportadas en este navegador')
    return false
  }

  // Registrar service worker
  try {
    await navigator.serviceWorker.register('/sw.js')
  } catch (e) {
    console.error('Error registrando SW:', e)
    return false
  }

  // Pedir permiso si no está dado
  if (Notification.permission === 'default') {
    const permiso = await Notification.requestPermission()
    if (permiso !== 'granted') return false
  }

  return Notification.permission === 'granted'
}

// Mostrar notificación local (sin servidor)
export function notificarLocal(titulo, mensaje, url = '/') {
  if (Notification.permission !== 'granted') return
  const n = new Notification(titulo, {
    body: mensaje,
    icon: '/assets/img/icon-192.png',
  })
  n.onclick = () => { window.focus(); window.location.href = url }
}

// Notificar cuando alguien descarga tu apunte
export function notificarDescarga(tituloApunte) {
  notificarLocal(
    '📥 Nueva descarga',
    `Alguien descargó tu apunte "${tituloApunte}"`,
    '/ganancias.html'
  )
}

// Notificar cuando alguien te da una propina
export function notificarPropina(monto) {
  notificarLocal(
    '🎁 ¡Recibiste una propina!',
    `Te enviaron $${monto.toLocaleString('es-CO')} COP`,
    '/ganancias.html'
  )
}

// Notificar cuando alguien valora tu apunte
export function notificarValoracion(estrellas, tituloApunte) {
  notificarLocal(
    `⭐ Nueva valoración (${estrellas}/5)`,
    `Valoraron tu apunte "${tituloApunte}"`,
    '/perfil.html'
  )
}