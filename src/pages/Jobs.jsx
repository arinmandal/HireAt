import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getSingleJob, updateHiringStatus } from "@/api/jobs";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  MapPinIcon,
} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from "@/components/ApplyJobs";
import ApplicationCard from "@/components/ApplicationCard";

const Jobs = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  // Get single job
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  // Update hiring status
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    },
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus({ job_id: id }, isOpen).then(() => fnJob({ job_id: id }));
  };

  useEffect(() => {
    if (isLoaded) fnJob({ job_id: id });
  }, [isLoaded]);

  if (!isLoaded || !user || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>

        <div className="flex gap-2">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>

        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>
      {/* Hiring Status */}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.recruiter_id === user?.id && (
        <Select
          onValueChange={handleStatusChange}
          value={job?.isOpen ? "open" : "closed"}
        >
          <SelectTrigger
            className={`w-full ${
              job?.isOpen
                ? "bg-green-950 dark:bg-green-950"
                : "bg-red-950 dark:bg-red-950"
            }`}
          >
            <SelectValue
              placeholder={
                "Hiring status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* About Jobs */}
      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent rounded-md sm:text-lg py-4"
      />

      {/* Applying for jobs */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={() => fnJob({ job_id: id })}
          applied={job?.applications?.some((ap) => ap.candidate_id === user.id)}
        />
      )}

      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {job?.applications.map((application) => {
            return (
              <>
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Jobs;
