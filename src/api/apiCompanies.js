import { createClerkSupabaseClient } from "@/utils/supabase";
import { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(sessionToken) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error Fetching Companies", error);
    return null;
  }

  return data;
}

// Upload companies
export async function addNewCompany(sessionToken, companyData) {
  const supabase = createClerkSupabaseClient(sessionToken);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  // Upload company logo
  const { error: storageError } = await supabase.storage
    .from("company_logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.error("Error uploading company logo", storageError);
    throw new Error("Error uploading company logo");
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company_logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (error) {
    console.error("Error Submitting Companies :", error);
    throw new Error("Error submitting company");
  }

  return data;
}
