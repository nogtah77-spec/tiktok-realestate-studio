import { createClient } from '@supabase/supabase-js';

const SUPABASE_CONFIG_KEY = 'alamoudi_supabase_config';

export const DEFAULT_SUPABASE_URL = 'https://ptreqzpfmtjuyrnuvkql.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cmVxenBmbXRqdXlybnV2a3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NzM2NzcsImV4cCI6MjEwMzI0OTY3N30.WlQREaxUylNzhTZ_a81jlsFkvMd_LrvjHKh0skEmbB0';

export function getSupabaseConfig() {
  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading Supabase config from localStorage:', e);
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
  };
}

// Singleton client to maintain active WebSocket connection across entire session
let cachedClient = null;

export function saveSupabaseConfig(config) {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
    cachedClient = null; // Invalidate cache so new client is created
  } catch (e) {
    console.error('Error saving Supabase config:', e);
  }
}

export function getSupabaseClient() {
  if (cachedClient) return cachedClient;

  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      cachedClient = createClient(config.url, config.anonKey, {
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      });
      return cachedClient;
    } catch (err) {
      console.error('Failed to create Supabase client:', err);
      return null;
    }
  }
  return null;
}

export async function testSupabaseConnection(url, anonKey) {
  try {
    const client = createClient(url || DEFAULT_SUPABASE_URL, anonKey || DEFAULT_SUPABASE_ANON_KEY);
    const { data, error } = await client.from('presets').select('count', { count: 'exact', head: true });
    if (error && error.code !== '42P01' && !error.message.includes('relation presets does not exist')) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'تم الاتصال بنجاح بسحابة Supabase!' };
  } catch (err) {
    return { success: false, message: err.message || 'فشل الاتصال' };
  }
}
