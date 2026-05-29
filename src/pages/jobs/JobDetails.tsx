import { Badge } from "@/components/ui/badge";
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
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarX2,
  Eye,
  FileStack,
  GraduationCap,
  Languages,
  MapPin,
  PencilLine,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  User,
  Users,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate, useParams } from "react-router-dom";

const job = {
  title: "Hr Business Partner (HRBP)",
  company: "Exact Manpower Consulting Ltd",
  status: "Published",
  keywords:
    "hr business partner jobs, hrbp vacancies, human resources roles tanzania, hr operations jobs, hr advisory positions",
  location: "Dar es Salaam",
  industry: "Consultancy",
  salary: "Negotiable",
  level: "Mid Management Level",
  gender: "Both",
  experience: "3 Years",
  tools: "Computer",
};

const education = [
  {
    level: "Bachelors Degree",
    programme: "HR Business Partner",
    major: "HRBP",
  },
];

const languages = [
  {
    name: "English",
    speak: "Excellent",
    write: "Good",
    understand: "Excellent",
    read: "Efficient",
  },
  {
    name: "Kiswahili",
    speak: "Excellent",
    write: "Good",
    understand: "Excellent",
    read: "Efficient",
  },
];

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex gap-4">
      <div className="flex-2 space-y-4">
        <Card>
          <CardContent className="flex items-center justify-between gap-2">
            <div>
              <Eye />
              <p>Views</p>
            </div>
            <div>
              <User />
              <p>Applicants</p>
            </div>
            <div>
              <BriefcaseBusiness />
              <p>Job Type</p>
            </div>
            <div>
              <Banknote />
              <p>Salary</p>
            </div>
            <div>
              <CalendarX2 />
              <p>Deadline</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            {/* Basic Info */}
            <div className="flex justify-between gap-4">
              <div className="flex size-16 items-center justify-center rounded-xl bg-muted">
                <Building2 className="size-8 text-primary" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>

                <p className="mt-1 text-muted-foreground">{job.company}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>{job.status}</Badge>

                  <Badge variant="secondary">
                    <MapPin className="mr-1 size-3" />
                    {job.location}
                  </Badge>

                  <Badge variant="outline">{job.industry}</Badge>
                </div>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline">
                    <PencilLine className="mr-2 size-4" />
                    Edit
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <Label htmlFor="sheet-demo-name">Name</Label>
                      <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="sheet-demo-username">Username</Label>
                      <Input
                        id="sheet-demo-username"
                        defaultValue="@peduarte"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            <Separator />

            {/* Keywords */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Meta Keywords (SEO)</h2>
                </div>

                <p className="leading-7 text-muted-foreground">
                  {job.keywords}
                </p>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
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
                    <p className="text-sm text-muted-foreground">Location</p>

                    <p className="mt-1 font-medium">{job.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>

                    <p className="mt-1 font-medium">{job.industry}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Salary Range
                    </p>

                    <p className="mt-1 font-medium text-primary">
                      {job.salary}
                    </p>
                  </div>
                </div>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
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

                    <p className="mt-1 font-medium">Supervision</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Interact</p>

                    <p className="mt-1 font-medium">
                      Employer, Management and Clients
                    </p>
                  </div>
                </div>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
            </div>

            <Separator />

            {/* Education */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Job Education</h2>
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
                    {education.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.level}</TableCell>

                        <TableCell>{item.programme}</TableCell>

                        <TableCell>{item.major}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
            </div>

            <Separator />

            {/* Languages */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Languages className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Languages</h2>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Language</TableHead>
                      <TableHead>Speak</TableHead>
                      <TableHead>Write</TableHead>
                      <TableHead>Understand</TableHead>
                      <TableHead>Read</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {languages.map((language, index) => (
                      <TableRow key={index}>
                        <TableCell>{language.name}</TableCell>
                        <TableCell>{language.speak}</TableCell>
                        <TableCell>{language.write}</TableCell>
                        <TableCell>{language.understand}</TableCell>
                        <TableCell>{language.read}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
            </div>

            <Separator />

            {/* Requirements */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Job Requirements</h2>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>

                    <p className="mt-1 font-medium">{job.level}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>

                    <p className="mt-1 font-medium">{job.gender}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>

                    <p className="mt-1 font-medium">{job.experience}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Tools</p>

                    <p className="mt-1 font-medium">{job.tools}</p>
                  </div>
                </div>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
            </div>

            <Separator />

            {/* Main Duties */}
            <div className="flex justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Main Duties</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Job Purpose</h3>

                    <p className="leading-7 text-muted-foreground">
                      The HR Business Partner (HRBP) acts as a strategic advisor
                      to management and employees, ensuring alignment between
                      business objectives and HR initiatives.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 text-lg font-semibold">
                      Key Responsibilities
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-2 font-semibold">
                          Strategic HR Advisory
                        </h4>

                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                          <li>
                            Partner with business leaders to understand
                            workforce needs.
                          </li>

                          <li>
                            Lead HR initiatives that improve organizational
                            effectiveness.
                          </li>

                          <li>
                            Support workforce planning and talent forecasting.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold">
                          Employee Relations & Engagement
                        </h4>

                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                          <li>
                            Build strong relationships with employees and line
                            managers.
                          </li>

                          <li>
                            Address employee concerns and resolve conflicts.
                          </li>

                          <li>
                            Support employee satisfaction and retention
                            initiatives.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold">
                          Performance & Talent Management
                        </h4>

                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                          <li>Coordinate performance management processes.</li>

                          <li>
                            Identify talent gaps and support succession
                            planning.
                          </li>

                          <li>Facilitate learning and development programs.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button size="sm" variant="outline">
                <PencilLine className="mr-2 size-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>HR Business Partner (HRBP)</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p>Publish</p>
              <Upload size={16} />
            </div>
            <Separator />
            <div
              onClick={() => navigate(`/jobs/${id}/applications`)}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-200"
            >
              <p>View Applications</p>
              <FileStack size={16} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p>Selected Applicants</p>
              <Users size={16} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p>Add Screener</p>
              <Plus size={16} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p>Delete Job</p>
              <Trash2 size={16} />
            </div>
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
