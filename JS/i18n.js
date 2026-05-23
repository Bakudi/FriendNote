
const traducciones = {
  es: {
    // Navbar
    nav_subir:          '+ Subir apunte',
    nav_explorar:       'Explorar',
    nav_inicio:         'Inicio',
    nav_perfil:         'Mi perfil',
    nav_logout:         'Cerrar sesión',
    nav_ganancias:      '💰 Mis ganancias',

    // Index
    buscar_placeholder: 'Buscar apuntes por título...',
    filtro_carreras:    'Todas las carreras',
    cargando:           '⏳ Cargando apuntes...',
    sin_apuntes:        '📭 No se encontraron apuntes.',

    // Subir
    subir_titulo:       'Subir apunte',
    subir_subtitulo:    'Comparte tu material de estudio con la comunidad',
    label_titulo:       'Título',
    label_descripcion:  'Descripción',
    label_carrera:      'Carrera',
    label_materia:      'Materia',
    label_archivo:      'Archivo PDF',
    btn_subir_apunte:   'Subir apunte',
    drop_texto:         'Arrastra tu PDF aquí o haz clic para seleccionarlo',
    drop_limite:        'Solo archivos PDF — máximo 10MB',

    // Detalle
    btn_descargar:      '⬇️ Descargar apunte',
    btn_eliminar:       '🗑️ Eliminar apunte',
    propina_label:      '🎁 ¿Te fue muy útil? Dale una propina al autor:',
    valoracion_titulo:  '¿Te fue útil este apunte?',
    valoracion_placeholder: 'Selecciona una valoración',
    btn_valorar:        'Enviar valoración',

    // Login
    login_titulo:       'Bienvenido',
    login_subtitulo:    'Accede para compartir y encontrar apuntes universitarios',
    login_google:       'Continuar con Google',

    // Perfil
    perfil_apuntes:     'Apuntes',
    perfil_descargas:   'Descargas',
    perfil_promedio:    'Promedio ⭐',
    mis_apuntes:        'Mis apuntes',

    // Ganancias
    ganancias_titulo:   '💰 Mis ganancias',
    ganancias_subtitulo:'Tus ingresos por compartir apuntes de calidad',
    saldo_label:        'Saldo disponible',
    btn_retirar:        '💸 Solicitar retiro',
    historial_titulo:   '📋 Historial de transacciones',
    sin_transacciones:  'Aún no tienes transacciones. ¡Sube apuntes para empezar a ganar!',

    // Explorar
    explorar_titulo:    'Explora apuntes universitarios',
    explorar_subtitulo: 'Encuentra materiales de estudio de tu carrera y materia',
    btn_buscar:         'Buscar',
  },
  en: {
    nav_subir:          '+ Upload note',
    nav_explorar:       'Explore',
    nav_inicio:         'Home',
    nav_perfil:         'My profile',
    nav_logout:         'Sign out',
    nav_ganancias:      '💰 My earnings',

    buscar_placeholder: 'Search notes by title...',
    filtro_carreras:    'All programs',
    cargando:           '⏳ Loading notes...',
    sin_apuntes:        '📭 No notes found.',

    subir_titulo:       'Upload note',
    subir_subtitulo:    'Share your study material with the community',
    label_titulo:       'Title',
    label_descripcion:  'Description',
    label_carrera:      'Program',
    label_materia:      'Subject',
    label_archivo:      'PDF File',
    btn_subir_apunte:   'Upload note',
    drop_texto:         'Drag your PDF here or click to select',
    drop_limite:        'PDF files only — 10MB max',

    btn_descargar:      '⬇️ Download note',
    btn_eliminar:       '🗑️ Delete note',
    propina_label:      '🎁 Found it useful? Tip the author:',
    valoracion_titulo:  'Was this note helpful?',
    valoracion_placeholder: 'Select a rating',
    btn_valorar:        'Submit rating',

    login_titulo:       'Welcome',
    login_subtitulo:    'Sign in to share and find university notes',
    login_google:       'Continue with Google',

    perfil_apuntes:     'Notes',
    perfil_descargas:   'Downloads',
    perfil_promedio:    'Avg ⭐',
    mis_apuntes:        'My notes',

    ganancias_titulo:   '💰 My earnings',
    ganancias_subtitulo:'Your income from sharing quality notes',
    saldo_label:        'Available balance',
    btn_retirar:        '💸 Request withdrawal',
    historial_titulo:   '📋 Transaction history',
    sin_transacciones:  'No transactions yet. Upload notes to start earning!',

    explorar_titulo:    'Explore university notes',
    explorar_subtitulo: 'Find study materials for your program and subject',
    btn_buscar:         'Search',
  }
}

export function getIdioma() {
  return localStorage.getItem('fn_idioma') ?? 'es'
}

export function setIdioma(idioma) {
  localStorage.setItem('fn_idioma', idioma)
  aplicarIdioma()
}

export function t(clave) {
  const idioma = getIdioma()
  return traducciones[idioma]?.[clave] ?? traducciones['es'][clave] ?? clave
}

// Aplica traducciones a elementos con data-i18n
// También actualiza placeholders con data-i18n-placeholder
export function aplicarIdioma() {
  // Textos normales
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n)
  })
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder)
  })
  // Actualizar botón de idioma
  const btn = document.getElementById('btn-idioma')
  if (btn) btn.textContent = getIdioma() === 'es' ? '🌐 EN' : '🌐 ES'
}

// Inserta botón flotante y aplica idioma actual
export function insertarSelectorIdioma() {
  // Evitar duplicados
  if (document.getElementById('btn-idioma')) {
    aplicarIdioma()
    return
  }

  const btn = document.createElement('button')
  btn.id = 'btn-idioma'
  btn.textContent = getIdioma() === 'es' ? '🌐 EN' : '🌐 ES'
  btn.style.cssText = `
    position: fixed; bottom: 24px; left: 24px;
    background: #1c1c26; border: 1.5px solid #2a2a3a;
    border-radius: 20px; padding: 6px 14px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 999;
    color: #f0f0f5; transition: all 0.2s;
  `
  btn.addEventListener('click', () => {
    setIdioma(getIdioma() === 'es' ? 'en' : 'es')
  })
  document.body.appendChild(btn)

  // Aplicar idioma guardado al cargar
  aplicarIdioma()
}