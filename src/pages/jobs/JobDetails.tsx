import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useJob } from "@/hooks/jobs";
import JobActions from "./JobActions";
import BasicDetails from "./components/BasicDetails";
import KeywordsDetails from "./components/KeywordsDetails";
import JobLocationDetails from "./components/JobLocationDetails";
import ReportingDetails from "./components/ReportingDetails";
import EducationDetails from "./components/EducationDetails";
import LanguageDetails from "./components/LanguageDetails";
import SpecificationDetails from "./components/SpecificationDetails";
import DutiesDetails from "./components/DutiesDetails";
import OtherRequirementsDetails from "./components/OtherRequirementsDetails";

const JobDetails = () => {
  const { id } = useParams();
  const jobId = Number(id);

  const { data: jobData } = useJob(jobId);
  const job = jobData?.data;

  // job published status, 1 === true or 0 === false
  const publishedStatus = Number(job?.published);

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardContent className="space-y-8">
            {/* Basic Info */}
            <BasicDetails job={job} />

            <Separator />

            {/* Job Location */}
            <JobLocationDetails job={job} />

            <Separator />

            {/* Keywords */}
            <KeywordsDetails job={job} />

            <Separator />

            {/* Reporting Structure */}
            <ReportingDetails job={job} />

            <Separator />

            {/* Education */}
            <EducationDetails job={job} />

            <Separator />

            {/* Languages */}
            <LanguageDetails job={job} />

            <Separator />

            {/* Candidate Specification */}
            <SpecificationDetails job={job} />

            <Separator />

            {/* Main Duties */}
            <DutiesDetails job={job} />

            <Separator />

            {/* Other requirements */}
            <OtherRequirementsDetails job={job} />
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 ">
        <div className="sticky top-4 space-y-4">
          <JobActions jobId={jobId} isPublished={publishedStatus} />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
