import { createClerkSupabaseClient } from "@/utils/supabase";

// Fetch Jobs
export async function getJobs(
  sessionToken,
  { location, company_id, searchQuery },
) {
  const supabase = createClerkSupabaseClient(sessionToken);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");
  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error while fetching Jobs:", error);
    throw new Error("Error fetching jobs");
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
      .eq("job_id", savedData.job_id);

    if (deleteError) {
      console.error("Error Deleting Saved Job:", deleteError);
      throw new Error("Error removing saved job");
    }

    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([savedData])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      throw new Error("Error saving job");
    }
    return data;
  }
}

// Get single jobs
export async function getSingleJob(sessionToken, { job_id }) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company:companies(name, logo_url), applications: applications(*)",
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error Fetching Jobs", error);
    throw new Error("Error fetching job details");
  }

  return data;
}

// Update hiring status
export async function updateHiringStatus(sessionToken, { job_id }, isOpen) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Job", error);
    throw new Error("Error updating hiring status");
  }

  return data;
}

// Add new job
export async function addNewJob(sessionToken, _, jobData) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error Creating Job", error);
    throw new Error("Error creating job");
  }

  return data;
}
