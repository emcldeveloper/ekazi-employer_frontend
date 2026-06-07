import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BriefcaseBusiness,
  CalendarX2,
  Eye,
  FileStack,
  GraduationCap,
  Languages,
  MapPin,
  Pencil,
  PencilLine,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useJob } from "@/hooks/jobs";
import { formatDate } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const jobId = Number(id);

  const { data: jobData } = useJob(jobId);
  const job = jobData?.data;
  console.log(jobData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardContent className="space-y-8">
            {/* Basic Info */}
            <div className="flex justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {job?.job_position?.position_name}
                </h1>

                <div className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <p>{job?.statistic?.job_views}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <p>{job?.applied_count}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} />
                    <p>{job?.job_type?.type_name}</p>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Banknote size={16} />
                    <p>Salary</p>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <CalendarX2 size={16} />
                    <p>{formatDate(job?.dead_line)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{job?.status}</Badge>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <PencilLine className="mr-2 size-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle> Basic Information</DialogTitle>
                    <DialogDescription>
                      Edit job basic information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                    {/* <BasicInfoForm /> */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            {/* Keywords */}
            <div>
              <div className="flex justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Meta Keywords (SEO)</h2>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <PencilLine className="mr-2 size-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Meta Keywords (SEO)</DialogTitle>
                      <DialogDescription>
                        Edit job meta keywords.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                      {/* <MetaForm /> */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="leading-7 text-muted-foreground">
                {job?.job_meta_keywords?.meta_keyword?.name}
              </p>
            </div>

            <Separator />

            {/* Job Location */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />

                  <h2 className="text-lg font-semibold">Job Location</h2>
                </div>

                <div className=" flex flex-col gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>

                    <p className="mt-1 font-medium">
                      {job?.job_addresses?.[0]?.region?.country?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Region</p>

                    <p className="mt-1 font-medium">
                      {job?.job_addresses?.[0]?.region?.region_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sub Location
                    </p>

                    <p className="mt-1 font-medium">
                      {job?.job_addresses?.[0]?.sub_location}
                    </p>
                  </div>

                  {/* <div>
                    <p className="text-sm text-muted-foreground">Industry</p>

                    <p className="mt-1 font-medium">
                      {job?.industry?.industry_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Salary Range
                    </p>

                    <p className="mt-1 font-medium text-primary">
                      {job?.entry_salary} - {job?.exit_salary}
                    </p>
                  </div> */}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <PencilLine className="mr-2 size-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Job Location</DialogTitle>
                    <DialogDescription>Edit job location.</DialogDescription>
                  </DialogHeader>
                  <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                    {/* <LocationForm /> */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            {/* Reporting Structure */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-primary" />

                  <h2 className="text-lg font-semibold">Reporting Structure</h2>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Report To</p>

                    <p className="mt-1 font-medium">
                      {job?.job_report_to?.report_to}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Interact</p>

                    <p className="mt-1 font-medium">
                      {job?.job_report_to?.interacts_with}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Supervises</p>

                    <p className="mt-1 font-medium">
                      {job?.job_report_to?.supervises}
                    </p>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <PencilLine className="mr-2 size-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Reporting Structure</DialogTitle>
                    <DialogDescription>
                      Edit reporting structure.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                    {/* <BasicInfoForm /> */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            {/* Education */}
            <div>
              <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Job Education</h2>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <PencilLine className="mr-2 size-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Job Education</DialogTitle>
                      <DialogDescription>
                        Edit job education information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                      {/* <BasicInfoForm /> */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Education Level</TableHead>
                    <TableHead>Programme Name</TableHead>
                    <TableHead>Specialized/Major</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {job?.job_education?.map((item: any) => (
                    <TableRow key={item?.id}>
                      <TableCell>
                        {item?.education_level?.education_level}
                      </TableCell>
                      <TableCell>{item?.course?.course_name}</TableCell>
                      <TableCell>{item?.major?.name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Pencil size={16} /> <Trash2 size={16} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            {/* Languages */}
            <div>
              <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Languages className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Languages</h2>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <PencilLine className="mr-2 size-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Languages</DialogTitle>
                      <DialogDescription>
                        Edit job languages information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                      {/* <BasicInfoForm /> */}
                    </div>
                  </DialogContent>
                </Dialog>
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
                  {job?.job_language.map((item: any) => (
                    <TableRow key={item?.id}>
                      <TableCell>{item?.language?.language_name}</TableCell>
                      <TableCell>
                        {item?.language_speak?.speak_ability}
                      </TableCell>
                      <TableCell>
                        {item?.language_write?.write_ability}
                      </TableCell>
                      <TableCell>
                        {item?.language_understand?.understand_ability}
                      </TableCell>
                      <TableCell>{item?.language_read?.read_ability}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Pencil size={16} /> <Trash2 size={16} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            {/* Requirements */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">
                    Candidate Specification
                  </h2>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>

                    <p className="mt-1 font-medium">
                      {job?.position_level?.position_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>

                    <p className="mt-1 font-medium">
                      {job?.job_gender?.gender_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>

                    <p className="mt-1 font-medium">
                      {job?.years_experience} Years
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Tools</p>

                    <p className="mt-1 font-medium">{job?.tools}</p>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <PencilLine className="mr-2 size-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Candidate Specification</DialogTitle>
                    <DialogDescription>
                      Edit candidate specification information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                    {/* <BasicInfoForm /> */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Separator />

            {/* Main Duties */}
            <div>
              <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Main Duties</h2>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <PencilLine className="mr-2 size-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Main Duties</DialogTitle>
                      <DialogDescription>
                        Edit main duties information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                      {/* <BasicInfoForm /> */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div
                className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6"
                dangerouslySetInnerHTML={{
                  __html: job?.job_duties?.main_duties,
                }}
              />
            </div>

            {/* Other requirements */}
            <div>
              <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Other Requirements</h2>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <PencilLine className="mr-2 size-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Other Requirements</DialogTitle>
                      <DialogDescription>
                        Edit other requirements information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                      {/* <BasicInfoForm /> */}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div
                className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6"
                dangerouslySetInnerHTML={{
                  __html: job?.job_other_requirement?.other_requirement,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between">
              Publish
              <Upload size={16} />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/jobs/${id}/applications`)}
              className="w-full justify-between"
            >
              View Applications
              <FileStack size={16} />
            </Button>

            <Button
              variant="outline"
              onClick={() => {}}
              className="w-full justify-between"
            >
              Selected Applicants
              <Users size={16} />
            </Button>

            <Button
              variant="outline"
              onClick={() => {}}
              className="w-full justify-between"
            >
              Add Screener
              <Plus size={16} />
            </Button>

            <Button
              variant="destructive"
              onClick={() => {}}
              className="w-full justify-between"
            >
              Delete Job
              <Trash2 size={16} />
            </Button>
          </CardContent>
        </Card>

        {/* potential candidates */}
        <Card>
          <CardContent>Potential candidates</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
