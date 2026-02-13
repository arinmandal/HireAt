import { getJobs } from '@/api/jobs'
import { useSession } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'

const JobListing = () => {
  const { session } = useSession();


  useEffect(() => {
    const fetchJobs = async () => {
      if (!session) return;

      try {
        const supabaseAccessToken = await session.getToken({
          template: 'supabase'
        });

        const data = await getJobs(supabaseAccessToken);
        console.log(data)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);


  return (
    <div>
      <h1>Job Listing</h1>
    </div>
  )
}

export default JobListing