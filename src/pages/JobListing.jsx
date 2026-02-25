import { getJobs } from "@/api/jobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from 'react-spinners'
import Jobs from "./Jobs";
import JobCards from "@/components/JobCards";

const JobListing = () => {

	const [searchQuery, setSearchQuery] = useState("");
	const [location, setLocation] = useState("");
	const [company_id, setCompany_id] = useState("");


	const { isLoaded } = useUser();

	const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, { location, company_id, searchQuery })

	useEffect(() => {
		if (isLoaded) fnJobs({ location, company_id, searchQuery })
	}, [isLoaded, location, company_id, searchQuery])

	if (!isLoaded) {
		return <BarLoader className='mb-4' width={"100%"} color='#4a5cff' />
	}


	return (
		<div>
			<h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

			{/* filters jobs */}

			{/* loading jobs */}

			{
				loadingJobs && (
					<BarLoader className='mb-4' width={"100%"} color='#4a5cff' />
				)
			}


			{
				loadingJobs === false && (
					<div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{jobs?.length ? (
							jobs.map((job, index) => {
								return <JobCards key={job.id} job={job} 
								savedInit={job?.saved?.length > 0}
								/>
							})
						) : (
							<div>
								No Jobs Found 🥲
							</div>
						)}
					</div>
				)
			}

		</div>
	);
};

export default JobListing;
