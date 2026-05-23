import { supabase } from './supabase-config.js'

// ── Subir apunte ──────────────────────────────
export async function subirApunte({ titulo, descripcion, materia, carrera, archivo, usuario }) {
  try {
    const nombreArchivo = `${usuario.id}_${Date.now()}_${archivo.name}`
    const { error: storageError } = await supabase
      .storage
      .from('apuntes')
      .upload(nombreArchivo, archivo)

    if (storageError) throw storageError

    const { data: urlData } = supabase
      .storage
      .from('apuntes')
      .getPublicUrl(nombreArchivo)

    const { data, error } = await supabase
      .from('apuntes')
      .insert([{
        titulo,
        descripcion,
        materia,
        carrera,
        archivo_url: urlData.publicUrl,
        usuario_id:     usuario.id,
        usuario_nombre: usuario.user_metadata?.full_name  ?? 'Anónimo',
        usuario_avatar: usuario.user_metadata?.avatar_url ?? null,
        valoracion_promedio: 0,
        total_descargas:     0,
      }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }

  } catch (error) {
    console.error('Error al subir apunte:', error.message)
    return { data: null, error }
  }
}

// ── Obtener todos los apuntes ─────────────────
export async function obtenerApuntes({ carrera, materia, busqueda } = {}) {
  try {
    let query = supabase
      .from('apuntes')
      .select('*')
      .order('created_at', { ascending: false })

    if (carrera)  query = query.eq('carrera', carrera)
    if (materia)  query = query.eq('materia', materia)
    if (busqueda) query = query.ilike('titulo', `%${busqueda}%`)

    const { data, error } = await query
    if (error) throw error
    return { data, error: null }

  } catch (error) {
    console.error('Error al obtener apuntes:', error.message)
    return { data: [], error }
  }
}

// ── Obtener apunte por ID ─────────────────────
export async function obtenerApuntePorId(id) {
  try {
    const { data, error } = await supabase
      .from('apuntes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { data, error: null }

  } catch (error) {
    console.error('Error al obtener apunte:', error.message)
    return { data: null, error }
  }
}

// ── Obtener apuntes de un usuario ─────────────
export async function obtenerApuntesDeUsuario(usuarioId) {
  try {
    const { data, error } = await supabase
      .from('apuntes')
      .select('*')
      .eq('usuario_id', usuarioId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }

  } catch (error) {
    console.error('Error al obtener apuntes del usuario:', error.message)
    return { data: [], error }
  }
}

// ── Registrar descarga ────────────────────────
export async function registrarDescarga(apunteId) {
  try {
    const { data: apunte } = await supabase
      .from('apuntes')
      .select('total_descargas')
      .eq('id', apunteId)
      .single()

    await supabase
      .from('apuntes')
      .update({ total_descargas: (apunte?.total_descargas ?? 0) + 1 })
      .eq('id', apunteId)

  } catch (error) {
    console.error('Error al registrar descarga:', error.message)
  }
}

// ── Valorar apunte ────────────────────────────
export async function valorarApunte(apunteId, usuarioId, estrellas) {
  try {
    const { data: existente } = await supabase
      .from('valoraciones')
      .select('id')
      .eq('apunte_id', apunteId)
      .eq('usuario_id', usuarioId)
      .single()

    if (existente) {
      await supabase
        .from('valoraciones')
        .update({ estrellas })
        .eq('id', existente.id)
    } else {
      await supabase
        .from('valoraciones')
        .insert([{ apunte_id: apunteId, usuario_id: usuarioId, estrellas }])
    }

    const { data: valoraciones } = await supabase
      .from('valoraciones')
      .select('estrellas')
      .eq('apunte_id', apunteId)

    const promedio = valoraciones.reduce((acc, v) => acc + v.estrellas, 0) / valoraciones.length

    await supabase
      .from('apuntes')
      .update({ valoracion_promedio: parseFloat(promedio.toFixed(1)) })
      .eq('id', apunteId)

    return { error: null }

  } catch (error) {
    console.error('Error al valorar apunte:', error.message)
    return { error }
  }
}

// ── Eliminar apunte ───────────────────────────
export async function eliminarApunte(apunteId, usuarioId) {
  try {
    const { error } = await supabase
      .from('apuntes')
      .delete()
      .eq('id', apunteId)
      .eq('usuario_id', usuarioId)

    if (error) throw error
    return { error: null }

  } catch (error) {
    console.error('Error al eliminar apunte:', error.message)
    return { error }
  }
}