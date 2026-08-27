import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formatDate } from "@/utils/helpers";
import type { Application } from "@/@types/applications";
import JobseekerDetails from "@/pages/app/jobseekers/components/JobseekerDetails";

type ApplicantDetailsProps = {
  application: Application;
};

export default function ApplicationDetails({
  application,
}: ApplicantDetailsProps) {
  // Data
  const applicantId = application.applicant_id;
  const applicant = application.applicant;
  const applicationTitle = application?.job?.job_position?.position_name;
  const applicationLetter = application?.letter;
  const applicationDate = formatDate(application?.updated_at);

  return (
    <div>
      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="letter">Application Letter</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <JobseekerDetails jobseekerId={applicantId} />
        </TabsContent>

        <TabsContent value="letter">
          <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
            <div className="p-6 border border-gray-300 rounded bg-white space-y-4">
              <div>
                <p className="font-semibold">
                  {applicant?.first_name} {applicant?.last_name}
                </p>
                <p> {applicant?.email}</p>
                <p>{applicationDate}</p>
              </div>

              <p>Dear Mr/Mrs,</p>

              <h5 className="font-semibold underline">
                RE: APPLICATION FOR {applicationTitle} POSITION
              </h5>

              <div className="whitespace-pre-wrap">{applicationLetter}</div>

              <p>Sincerely,</p>
              <p>
                {applicant?.first_name} {applicant?.last_name}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
