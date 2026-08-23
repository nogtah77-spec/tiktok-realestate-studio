import { createClient } from '@supabase/supabase-js';

const SUPABASE_CONFIG_KEY = 'alamoudi_supabase_config';

export function getSupabaseConfig() {
  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading Supabase config from localStorage:', e);
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
}

export function saveSupabaseConfig(config) {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving Supabase config:', e);
  }
}

export function getSupabaseClient() {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      return createClient(config.url, config.anonKey);
    } catch (err) {
      console.error('Failed to create Supabase client:', err);
      return null;
    }
  }
  return null;
}

export async function testSupabaseConnection(url, anonKey) {
  try {
    const client = createClient(url, anonKey);
    const { data, error } = await client.from('presets').select('count', { count: 'exact', head: true });
    // Even if table doesn't exist yet, reaching Supabase without auth failure means URL & key are reachable
    if (error && error.code !== '42P01' && !error.message.includes('relation presets does not exist')) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'تم الاتصال بنجاح بسحابة Supabase!' };
  } catch (err) {
    return { success: false, message: err.message || 'فشل الاتصال' };
  }
}
