// ============================================
// Friendnote — Sistema de localización (i18n)
// ============================================

const traducciones = {
  es: {
    nav_inicio:     'Inicio',
    nav_explorar:   'Explorar',
    nav_subir:      'Subir',
    nav_perfil:     'Mi perfil',
    nav_logout:     'Cerrar sesión',
    buscar_placeholder: 'Buscar apuntes por título...',
    btn_buscar:     'Buscar',
    btn_subir:      '+ Subir apunte',
    btn_descargar:  '⬇️ Descargar apunte',
    btn_valorar:    'Enviar valoración',
    todas_carreras: 'Todas las carreras',
    cargando:       '⏳ Cargando...',
    sin_apuntes:    '📭 No se encontraron apuntes.',
    valoracion_placeholder: 'Selecciona una valoración',
    propina_label:  '🎁 ¿Te fue muy útil? Dale una propina al autor:',
    login_titulo:   'Bienvenido',
    login_subtitulo:'Accede para compartir y encontrar apuntes universitarios',
    login_google:   'Continuar con Google',
    subir_titulo:   'Subir apunte',
    subir_subtitulo:'Comparte tu material de estudio con la comunidad',
    campo_titulo:   'Título',
    campo_descripcion: 'Descripción',
    campo_carrera:  'Carrera',
    campo_materia:  'Materia',
    campo_archivo:  'Archivo PDF',
    exito_subida:   '✅ ¡Apunte subido correctamente!',
    error_campos:   'Por favor completa todos los campos obligatorios.',
    error_tamano:   'El archivo supera el límite de 10MB.',
  },
  en: {
    nav_inicio:     'Home',
    nav_explorar:   'Explore',
    nav_subir:      'Upload',
    nav_perfil:     'My profile',
    nav_logout:     'Sign out',
    buscar_placeholder: 'Search notes by title...',
    btn_buscar:     'Search',
    btn_subir:      '+ Upload note',
    btn_descargar:  '⬇️ Download note',
    btn_valorar:    'Submit rating',
    todas_carreras: 'All programs',
    cargando:       '⏳ Loading...',
    sin_apuntes:    '📭 No notes found.',
    valoracion_placeholder: 'Select a rating',
    propina_label:  '🎁 Found it useful? Tip the author:',
    login_titulo:   'Welcome',
    login_subtitulo:'Sign in to share and find university notes',
    login_google:   'Continue with Google',
    subir_titulo:   'Upload note',
    subir_subtitulo:'Share your study material with the community',
    campo_titulo:   'Title',
    campo_descripcion: 'Description',
    campo_carrera:  'Program',
    campo_materia:  'Subject',
    campo_archivo:  'PDF File',
    exito_subida:   '✅ Note uploaded successfully!',
    error_campos:   'Please complete all required fields.',
    error_tamano:   'File exceeds the 10MB limit.',
  }
}

// Obtener idioma guardado o usar español por defecto
export function getIdioma() {
  return localStorage.getItem('fn_idioma') ?? 'es'
}

// Cambiar idioma
export function setIdioma(idioma) {
  localStorage.setItem('fn_idioma', idioma)
  aplicarIdioma()
}

// Traducir una clave
export function t(clave) {
  const idioma = getIdioma()
  return traducciones[idioma]?.[clave] ?? traducciones['es'][clave] ?? clave
}

// Aplicar idioma a todos los elementos con data-i18n
export function aplicarIdioma() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const clave = el.dataset.i18n
    if (el.placeholder !== undefined) {
      el.placeholder = t(clave)
    } else {
      el.textContent = t(clave)
    }
  })
}

// Selector de idioma — inserta un botón flotante
export function insertarSelectorIdioma() {
  const idioma = getIdioma()
  const btn = document.createElement('button')
  btn.id = 'btn-idioma'
  btn.textContent = idioma === 'es' ? '🌐 EN' : '🌐 ES'
  btn.style.cssText = `
    position: fixed; bottom: 24px; left: 24px;
    background: white; border: 1.5px solid #e0e0e0;
    border-radius: 20px; padding: 6px 14px;
    font-size: 13px; font-weight: 500; cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 100;
    transition: all 0.2s;
  `
  btn.addEventListener('click', () => {
    setIdioma(idioma === 'es' ? 'en' : 'es')
    btn.textContent = getIdioma() === 'es' ? '🌐 EN' : '🌐 ES'
  })
  document.body.appendChild(btn)
  aplicarIdioma()
}