import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}


export function createClerkSupabaseClient(sessionToken) {
    return createClient(
        supabaseUrl,
        supabaseKey,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
            },
        }
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

