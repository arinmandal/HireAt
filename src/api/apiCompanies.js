import { createClerkSupabaseClient } from '@/utils/supabase'


export async function getCompanies(sessionToken) {
    const supabase = createClerkSupabaseClient(sessionToken)

    const { data, error } = await supabase.from("companies").select("*");

    if (error) {
        console.error("Error Fetching Companies", error);
        return null;
    }

    return data;

}