import { createClerkSupabaseClient } from '@/utils/supabase'

// Fetch Jobs
export async function getJobs(sessionToken, { location, company_id, searchQuery }) {
    const supabase = createClerkSupabaseClient(sessionToken);

    let query = supabase.from("jobs").select("*, company:companies(name,logo_url), saved:saved_jobs(id)");
    if (location) {
        query = query.eq("location", location);
    }

    if (company_id) {
        query = query.eq('company_id', company_id);
    }

    if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error while fetching Jobs:', error);
        return null;
    }

    return data;
}




// Saved Jobs
export async function savedJob(sessionToken, { alreadySaved }, savedData) {
    const supabase = createClerkSupabaseClient(sessionToken);

    if (alreadySaved) {
        const { data, error: deleteError } = await supabase
            .from("saved_jobs")
            .delete()
            .eq('job_id', savedData.job_id);


        if (deleteError) {
            console.error("Error Deleting Saved Job:", deleteError);
            return null;
        }

        return data;
    } else {
        const { data, error: insertError } = await supabase
            .from("saved_jobs")
            .insert([savedData])
            .select();

        if (insertError) {
            console.error('Error while fetching Jobs:', insertError);
            return null;
        }
        return data;
    }

}