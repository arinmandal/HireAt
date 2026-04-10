import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { FileX, Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { savedJob } from "../api/jobs";
const JobCards = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJobs,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch(savedJob);

  const { user } = useUser();

  const handleSavedJobs = async () => {
    await fnSavedJobs(
      { alreadySaved: saved },
      { user_id: user.id, job_id: job.id },
    );
    onJobSaved();
  };

  useEffect(() => {
    if (savedJobs !== undefined) setSaved(savedJobs?.length > 0);
  }, [savedJobs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
        </CardTitle>
        {isMyJob && (
          <Trash2Icon
            fill="red"
            size={18}
            className="text-red-300 cursor-pointer"
          />
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSavedJobs}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCards;
