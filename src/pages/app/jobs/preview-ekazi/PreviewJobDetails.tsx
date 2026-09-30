import { Eye, Users, Briefcase, Banknote, Calendar } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { IMG_BASE } from "@/constants";
import type { ReactNode } from "react";
import { useJob } from "@/hooks/jobs";
import { Spinner } from "@/components/ui/spinner";

interface PreviewJobDetailsProps {
  jobId: number;
}

const PreviewJobDetails = ({ jobId }: PreviewJobDetailsProps) => {
  const { data: job, isLoading } = useJob(jobId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="space-y-4 my-5">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <img
          src={`${IMG_BASE}${job?.client?.logo}`}
          alt={job?.client?.name || "Company Logo"}
          className="object-contain max-w-30 max-h-18.75"
        />

        <div className="text-start">
          <h2 className="font-semibold text-lg">{job?.position?.name}</h2>
          <p className="text-sm text-muted-foreground">{job?.client?.name}</p>
        </div>
      </div>

      <Separator />

      {/* Top Stats */}
      <div className="grid grid-cols-3 text-start gap-4">
        <div className="flex gap-1 items-center text-sm">
          <Eye size={16} className="text-orange-500" />
          <span>{job?.statistics?.[0]?.job_views ?? 0}</span>
          <span>Views</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Users size={16} className="text-orange-500" />
          <span>{job.total_applicants ?? 0}</span>
          <span>Applicants</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Briefcase size={16} className="text-orange-500" />
          <span>{job?.job_type?.name}</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Banknote size={16} className="text-orange-500" />
          <span>
            {job?.salaries?.[0]?.from_salary?.low.toLocaleString()} -
            {job?.salaries?.[0]?.to_salary?.low.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Calendar size={16} className="text-orange-500" />
          <span>{new Date(job?.dead_line).toDateString() ?? "Deadline"}</span>
        </div>
      </div>

      <Separator />

      {/* Details */}
      <div className="space-y-4 text-sm">
        <Section title="Reporting Structure">
          {job?.report_to?.[0]?.report_to && (
            <Item label="Report To" value={job?.report_to?.[0]?.report_to} />
          )}
          {job?.report_to?.[0]?.supervises && (
            <Item label="Supervision" value={job?.report_to?.[0]?.supervises} />
          )}
          {job?.report_to?.[0]?.interacts_with && (
            <Item
              label="Interacts With"
              value={job?.report_to?.[0]?.interacts_with}
            />
          )}
        </Section>

        <Section title="Job Requirements">
          {job.position_level?.name && (
            <Item label="Job Level" value={job.position_level?.name} />
          )}
          {job.gender?.name && <Item label="Gender" value={job.gender?.name} />}
          {job.years_experience && (
            <Item label="Experience" value={`${job.years_experience} Years`} />
          )}
        </Section>
      </div>

      <Separator />

      {/* Duties */}
      <div>
        <h3 className="font-semibold mb-2">Main Duties</h3>
        <div
          className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: job.requirements?.[0]?.main_duties,
          }}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Other Requirements</h3>
        <div
          className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: job.other_requirements?.[0]?.other_requirement ?? "",
          }}
        />
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const Item = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-3">
    <span className="font-medium">{label}:</span>
    <span className="col-span-2 text-muted-foreground">{value}</span>
  </div>
);

export default PreviewJobDetails;
