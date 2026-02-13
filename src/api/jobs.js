import { createClerkSupabaseClient } from '@/utils/supabase'

// , {location, company_id, searchQuery}
export async function getJobs(sessionToken) {
    const supabase = createClerkSupabaseClient(sessionToken);

    let query = supabase.from("jobs").select("*");
    const { data, error } = await query;

    if (error) {
        console.log('Error while fetching Jobs:', error);
        return null;
    }

    return data;
}