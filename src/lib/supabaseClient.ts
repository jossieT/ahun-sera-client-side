
import { createClient } from '@supabase/supabase-js';

const getSupabaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url || !url.startsWith('http')) {
    console.warn('Supabase URL is missing or invalid. Using placeholder.');
    console.warn('Current value:', url);
    return 'https://placeholder.supabase.co';
  }
  return url;
};

const getSupabaseKey = () => {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return key || 'placeholder-key';
};

export const supabase = createClient(getSupabaseUrl(), getSupabaseKey());
