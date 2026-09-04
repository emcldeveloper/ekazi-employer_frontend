import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GraduationCapIcon } from "lucide-react";
import type { Education, Job } from "@/@types/job";

interface EducationDetailsProps {
  job: Job;
}

const EducationDetails = ({ job }: EducationDetailsProps) => {
  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <GraduationCapIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Job Education</h2>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Education Level</TableHead>
            <TableHead>Programme Name</TableHead>
            <TableHead>Specialized/Major</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {job?.education?.length > 0 ? (
            job?.education.map((item: Education) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.education_level?.name}</TableCell>
                <TableCell>{item?.course?.name}</TableCell>
                <TableCell>{item?.major?.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EducationDetails;
