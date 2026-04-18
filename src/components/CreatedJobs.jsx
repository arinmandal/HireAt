import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { getMyJob } from "@/api/jobs";
import { useEffect } from "react";
import JobCards from "./JobCards";
import { BarLoader } from "react-spinners";
const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJob);

  useEffect(() => {
    fnCreatedJobs({ recruiter_id: user.id });
  }, []);

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {createdJobs?.length ? (
          createdJobs?.map((job, index) => {
            return (
              <JobCards
                key={job.id}
                job={job}
                onJobSaved={() => fnCreatedJobs({ recruiter_id: user.id })}
                isMyJob
              />
            );
          })
        ) : (
          <div>No Jobs Found 🥲</div>
        )}
      </div>
    </div>
  );
};

export default CreatedJobs;
