
import { createClient } from '@supabase/supabase-js'

// Obtén la URL y la clave anónima de Supabase desde las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Valida que las variables de entorno estén definidas
if (!supabaseUrl) {
  throw new Error("La variable de entorno NEXT_PUBLIC_SUPABASE_URL no está definida.")
}

if (!supabaseAnonKey) {
  throw new Error("La variable de entorno NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida.")
}

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
