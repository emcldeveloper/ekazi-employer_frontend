import { BriefcaseBusinessIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type {
  CultureItem,
  Job,
  KnowledgeItem,
  PersonalityItem,
  ProficiencyItem,
  SoftwareItem,
  ToolItem,
} from "@/@types/job";

interface SpecificationDetailsProps {
  job: Job;
}

const SpecificationDetails = ({ job }: SpecificationDetailsProps) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <BriefcaseBusinessIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Candidate Specification</h2>
        </div>

        <div className="grid grid-cols-[140px_1fr] gap-y-3">
          <p className="text-sm text-muted-foreground dark:text-white">
            Experience Years:
          </p>
          <p className="font-medium">{job?.years_experience || "-"}</p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Age Group:
          </p>
          <p className="font-medium">
            {job?.applicant_min_age} - {job?.applicant_max_age}
          </p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Gender:
          </p>
          <p className="font-medium">{job?.gender?.name}</p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Culture:
          </p>
          <div className="font-medium flex flex-wrap gap-1">
            {job?.cultures.length > 0
              ? job?.cultures?.map((item: CultureItem) => (
                  <Badge variant="outline" key={item.id}>
                    {item?.culture?.name}
                  </Badge>
                ))
              : "N/A"}
          </div>

          <p className="text-sm text-muted-foreground dark:text-white">
            Personalities:
          </p>
          <div className="font-medium flex flex-wrap gap-1">
            {job?.personalities.length > 0
              ? job?.personalities?.map((item: PersonalityItem) => (
                  <Badge variant="outline" key={item.id}>
                    {item?.personality?.name}
                  </Badge>
                ))
              : "N/A"}
          </div>

          <p className="text-sm text-muted-foreground dark:text-white">
            Skills:
          </p>
          <div className="font-medium flex flex-wrap gap-1">
            {job?.knowledge.length > 0
              ? job?.knowledge?.map((item: KnowledgeItem) => (
                  <Badge variant="outline" key={item.id}>
                    {item?.knowledge?.name}
                  </Badge>
                ))
              : "N/A"}
          </div>

          <p className="text-sm text-muted-foreground dark:text-white">
            Softwares:
          </p>
          <p className="font-medium flex flex-wrap gap-1">
            {job?.softwares.length > 0
              ? job?.softwares?.map((item: SoftwareItem) => (
                  <Badge variant="outline" key={item.id}>
                    {item?.software?.name}
                  </Badge>
                ))
              : "N/A"}
          </p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Proficiencies:
          </p>
          <p className="font-medium flex flex-wrap gap-1">
            {job?.proficiencies.length > 0
              ? job?.proficiencies?.map((item: ProficiencyItem) => (
                  <Badge variant="outline" key={item.id}>
                    {item?.proficiency?.name}
                  </Badge>
                ))
              : "N/A"}
          </p>

          <p className="text-sm text-muted-foreground dark:text-white">Tools</p>
          <p className="font-medium flex flex-wrap gap-1">
            {job?.tools.length > 0
              ? job?.tools?.map((item: ToolItem) => (
                  <Badge variant="outline" key={item.id}>
                    {item?.tool?.name}
                  </Badge>
                ))
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecificationDetails;
