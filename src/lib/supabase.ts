import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Access environment variables securely
// Note: In a real app, use react-native-dotenv or similar. 
// For this setup, we'll assume they are available or hardcoded for now if env fails.
// Since the user has .env opened, we'll suggest they add keys there.
// For now, we will just use process.env if available, or placeholders.

import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@env';

const supabaseUrl = SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = SUPABASE_PUBLISHABLE_KEY || 'YOUR_SUPABASE_PUBLISHABLE_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
