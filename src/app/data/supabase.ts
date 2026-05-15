import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const hasSupabaseConfig =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !supabaseUrl!.includes("YOUR-PROJECT-REF") &&
  !supabaseAnonKey!.includes("your-anon-public-key");

export const supabase = hasSupabaseConfig
  ? (() => {
      const url = supabaseUrl as string;
      const anonKey = supabaseAnonKey as string;

      return createClient(url, anonKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
          persistSession: true,
        },
      });
    })()
  : null;

export function isSupabaseConfigured() {
  return supabase !== null;
}
