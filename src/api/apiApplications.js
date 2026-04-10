import { createClerkSupabaseClient } from "@/utils/supabase";
import { supabaseUrl } from "@/utils/supabase";

// Apply jobs
export async function applyToJobs(sessionToken, jobData) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  // Upload Resume
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading resumes", storageError);
    throw new Error("Error uploading resume");
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // Only insert DB-safe fields (exclude the raw File object)
  const { candidate_id, job_id, name, status, experience, skills, education } =
    jobData;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        candidate_id,
        job_id,
        name,
        status,
        experience,
        skills,
        education,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error Submitting Applications", error);
    throw new Error("Error submitting application");
  }

  return data;
}

// Update Applications
export async function updateApplications(sessionToken, { id }, status) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}
