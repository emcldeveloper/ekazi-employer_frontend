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

import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateFeature from "./CreateFeature";
import { useFeatures } from "@/hooks/subscription-features";
import type { Feature } from "@/@types/subscriptions";
import { Spinner } from "@/components/ui/spinner";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import DeleteFeature from "./DeleteFeature";
import UpdateFeature from "./UpdateFeature";

const FeaturesList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: featuresData, isLoading } = useFeatures(
    page,
    perPage,
    debouncedSearch,
  );

  const features = featuresData?.data ?? [];

  return (
    <div>
      <Card>
        <CardContent className="space-y-4">
          {/* Search & Filters */}

          <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search recruiter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <CreateFeature />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-32">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : features.length > 0 ? (
                features.map((feature: Feature) => (
                  <TableRow key={feature?.id}>
                    <TableCell>{feature?.name}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <UpdateFeature feature={feature} />
                        <DeleteFeature id={feature?.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-30">
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* pagination */}
          {features.length > 0 && (
            <DataPagination
              page={featuresData?.page}
              perPage={featuresData?.limit}
              totalPages={featuresData?.totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesList;
