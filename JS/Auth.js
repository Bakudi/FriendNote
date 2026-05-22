// ============================================
// Friendnote — Autenticación con Google
// ============================================

import { supabase } from './supabase-config.js'

// ── Login con Google ──────────────────────────
export async function loginConGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/index.html'
    }
  })
  if (error) console.error('Error al iniciar sesión:', error.message)
}

// ── Cerrar sesión ─────────────────────────────
export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error al cerrar sesión:', error.message)
  window.location.href = '/login.html'
}

// ── Obtener usuario actual ────────────────────
export async function obtenerUsuario() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── Proteger páginas privadas ─────────────────
// Llama esta función al inicio de cada página que requiera login
export async function protegerPagina() {
  const user = await obtenerUsuario()
  if (!user) {
    window.location.href = '/login.html'
  }
  return user
}

// ── Escuchar cambios de sesión ────────────────
export function escucharSesion(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
}