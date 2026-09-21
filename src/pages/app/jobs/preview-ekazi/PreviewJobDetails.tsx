import { Eye, Users, Briefcase, Banknote, Calendar } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { IMG_BASE } from "@/constants";
import type { ReactNode } from "react";

interface PreviewJobDetailsProps {
  job: any;
}

const PreviewJobDetails = ({ job }: PreviewJobDetailsProps) => {
  const j = job;

  return (
    <div className="space-y-4 my-5">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <img
          src={`${IMG_BASE}${job.client?.logo || ""}`}
          alt={job.client?.client_name || "Company Logo"}
          className="object-contain max-w-30 max-h-18.75"
        />

        <div className="text-start">
          <h2 className="font-semibold text-lg">
            {job.job_position?.position_name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {job.client?.client_name}
          </p>
        </div>
      </div>

      <Separator />

      {/* Top Stats */}
      <div className="grid grid-cols-3 text-start gap-4">
        <div className="flex gap-1 items-center text-sm">
          <Eye size={16} className="text-orange-500" />
          <span>{job.statistic?.job_views ?? 0}</span>
          <span>Views</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Users size={16} className="text-orange-500" />
          <span>
            {job.applied_count ?? job.indirect_applicant?.length ?? 0}
          </span>
          <span>Applicants</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Briefcase size={16} className="text-orange-500" />
          <span>{job.job_type?.type_name}</span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Banknote size={16} className="text-orange-500" />
          <span>
            {job.entry_salary || job.exit_salary
              ? `${job.entry_salary ?? 0} - ${job.exit_salary}`
              : "Negotiable"}
          </span>
        </div>

        <div className="flex gap-1 items-center text-sm">
          <Calendar size={16} className="text-orange-500" />
          <span>{new Date(job.dead_line).toDateString() ?? "Deadline"}</span>
        </div>
      </div>

      <Separator />

      {/* Details */}
      <div className="space-y-4 text-sm">
        <Section title="Reporting Structure">
          {j.job_report_to?.report_to && (
            <Item label="Report To" value={j.job_report_to.report_to} />
          )}
          {j.job_report_to?.supervises && (
            <Item label="Supervision" value={j.job_report_to.supervises} />
          )}
          {j.job_report_to?.interacts_with && (
            <Item
              label="Interacts With"
              value={j.job_report_to.interacts_with}
            />
          )}
        </Section>

        <Section title="Job Requirements">
          {j.position_level?.position_name && (
            <Item label="Job Level" value={j.position_level.position_name} />
          )}
          {j.job_gender?.gender_name && (
            <Item label="Gender" value={j.job_gender.gender_name} />
          )}
          {j.years_experience && (
            <Item label="Experience" value={`${j.years_experience} Years`} />
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
            __html: job.job_duties?.main_duties,
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
            __html: job.job_other_requirement?.other_requirement ?? "",
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
