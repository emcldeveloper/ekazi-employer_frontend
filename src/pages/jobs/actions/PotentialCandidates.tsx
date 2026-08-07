import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { usePotentialCandidates } from "@/hooks/jobs";
import { SearchIcon } from "lucide-react";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import type { PotentialCandidate } from "@/@types/potential-candidates";
import ViewCandidate from "./ViewCandidate";

const PotentialCandidates = () => {
  const { id } = useParams();
  const jobId = Number(id);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: potentialData, isLoading } = usePotentialCandidates(
    jobId,
    debouncedSearch,
    page,
    perPage,
  );

  const title = potentialData?.job?.position;
  const potentialCandidates = potentialData?.data ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>Potential Candidates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search company or title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Current Position</TableHead>
                <TableHead>Match (%)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : potentialCandidates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-40 text-center text-muted-foreground"
                  >
                    No Potential candidates found
                  </TableCell>
                </TableRow>
              ) : (
                potentialCandidates.map((candidate: PotentialCandidate) => (
                  <TableRow key={candidate?.applicant_id}>
                    <TableCell>{candidate?.full_name}</TableCell>
                    <TableCell>{candidate?.current_position}</TableCell>
                    <TableCell>{candidate?.match_percentage}</TableCell>

                    <TableCell className="text-right">
                      <ViewCandidate candidate={candidate} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <DataPagination
            page={potentialData?.page}
            perPage={potentialData?.limit}
            totalPages={potentialData?.totalPages}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PotentialCandidates;
