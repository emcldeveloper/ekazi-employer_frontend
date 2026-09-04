import { useAdminJob } from "@/hooks/admin";
import BasicDetails from "./BasicDetails";
import { Separator } from "@/components/ui/separator";
import JobLocationDetails from "./JobLocationDetails";
import KeywordsDetails from "./KeywordsDetails";
import ReportingDetails from "./ReportingDetails";
import EducationDetails from "./EducationDetails";
import LanguageDetails from "./LanguageDetails";
import SpecificationDetails from "./SpecificationDetails";
import DutiesDetails from "./DutiesDetails";
import OtherRequirementsDetails from "./OtherRequirementsDetails";

interface AdminJobDetailsProps {
  jobId: number;
}

const AdminJobDetails = ({ jobId }: AdminJobDetailsProps) => {
  const { data: job, isLoading } = useAdminJob(jobId);

  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <BasicDetails job={job} />
      <Separator />
      <JobLocationDetails job={job} />
      <Separator />
      <KeywordsDetails job={job} />
      <Separator />
      <ReportingDetails job={job} />
      <Separator />
      <EducationDetails job={job} />
      <Separator />

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
    </div>
  );
};

export default AdminJobDetails;
