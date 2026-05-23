import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://ojwnvijcyrddpadyyoce.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd252aWpjeXJkZHBhZHl5b2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0ODUxNzcsImV4cCI6MjA5NTA2MTE3N30.Lg-NuNcwWcI8hwmost-TtJQ0YzlSDTZE2ciL9BtK0yQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)