// ============================================
// Friendnote — Configuración de Supabase
// ============================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://ojwnvijcyrddpadyyoce.supabase.co'
const SUPABASE_KEY = 'sb_publishable_qLeBcx3wOQ8tbfIbZnU9Cg_BFDzT2xl'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)