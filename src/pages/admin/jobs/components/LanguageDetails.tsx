import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LanguagesIcon } from "lucide-react";

import type { Job, LanguageRequirement } from "@/@types/job";

interface LanguageDetailsProps {
  job: Job;
}

const LanguageDetails = ({ job }: LanguageDetailsProps) => {
  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <LanguagesIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Languages</h2>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead>Speak</TableHead>
            <TableHead>Write</TableHead>
            <TableHead>Understand</TableHead>
            <TableHead>Read</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {job?.languages?.length > 0 ? (
            job?.languages.map((item: LanguageRequirement) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.language?.name}</TableCell>
                <TableCell>{item?.speak?.name}</TableCell>
                <TableCell>{item?.write?.name}</TableCell>
                <TableCell>{item?.understand?.name}</TableCell>
                <TableCell>{item?.read?.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-6 text-center text-muted-foreground"
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

export default LanguageDetails;
