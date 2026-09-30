import { Eye } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import PremiumBadge from "@/components/premium-badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useIsMobile } from "@/hooks/use-mobile";
import PreviewJobDetails from "./PreviewJobDetails";
import { DEFAULT_IMG, IMG_BASE } from "@/constants";
import { capitalizeText } from "@/utils/helpers";
import type { Job } from "@/@types/job";

interface PreviewJobCardProps {
  job: Job;
}

const PreviewJobCard = ({ job }: PreviewJobCardProps) => {
  const isMobile = useIsMobile();

  // Extracting safer values
  const jobTitle = job.position?.position_name;
  const region = job.addresses?.[0]?.region?.name;
  const countryName = job.addresses?.[0]?.region?.country?.name;
  const safeCountry = countryName?.toLowerCase();
  const featuredCompany = job.featured;

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="w-20 h-18.75 flex items-center justify-center">
            <img
              src={
                job.client?.logo
                  ? `${IMG_BASE}${job.client.logo}`
                  : `${DEFAULT_IMG}`
              }
              alt={job.client?.client_name || "Company Logo"}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {featuredCompany && <PremiumBadge />}
        </div>

        {/* Title + Company */}
        <div className="mb-2">
          <h6 className="text-Orange font-semibold truncate">
            {capitalizeText(jobTitle)}
          </h6>
          <p className="text-sm text-Blue">{job.client?.client_name}</p>
        </div>

        {/* Details */}
        <div className="text-xs text-muted-foreground space-y-1">
          {/* <div>Job Type: {job.job_type?.type_name}</div> */}

          {/* Location */}
          <div>
            {safeCountry === "remote" ? (
              <span>Location: Remote</span>
            ) : job.addresses?.length > 0 ? (
              <span>
                Location:{" "}
                {job.addresses[0].sub_location
                  ? `${capitalizeText(job.addresses[0].sub_location)}, `
                  : ""}
                {region}
                {countryName ? `, ${countryName}` : ""}
              </span>
            ) : (
              <span>Location: N/A</span>
            )}
          </div>

          {/* Deadline */}
          <div>
            <span className="text-Blue font-semibold">Deadline:</span>{" "}
            {job.dead_line
              ? new Date(job.dead_line).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </div>

          <div>Industry: {job.industry?.name || "N/A"}</div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center bg-white">
        {isMobile ? (
          <Drawer>
            <DrawerTrigger className="text-sm">
              <Button variant="outline">View</Button>
            </DrawerTrigger>
            <DrawerContent className="border-none">
              <VisuallyHidden>
                <DrawerHeader>
                  <DrawerTitle>Title</DrawerTitle>
                  <DrawerDescription>Description</DrawerDescription>
                </DrawerHeader>
              </VisuallyHidden>

              <div className="flex-1 scroll-fade overflow-y-auto p-4">
                <PreviewJobDetails jobId={job.id} />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="link">
                View
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-3xl!">
              <div className="scrollbar overflow-y-auto px-4">
                <PreviewJobDetails jobId={job.id} />
              </div>
            </SheetContent>
          </Sheet>
        )}

        <div className="flex items-center gap-1 text-sm">
          <Eye size={16} className="text-Orange" />
          <span>{job?.jobStatistics?.[0]?.job_views ?? 0}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PreviewJobCard;
