import {
  CircleQuestionMarkIcon,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useApplicant } from "@/hooks/applicants";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import CultureSection from "./components/CultureSection";
import LanguageSection from "./components/LanguageSection";
import PersonalitySection from "./components/PersonalitySection";
import ProficiencySection from "./components/ProficiencySection";
import RefereeSection from "./components/RefereeSection";
import SoftwareSection from "./components/SoftwareSection";
import TraniningSection from "./components/TraniningSection";
import { ToolsSection } from "./components/ToolsSection";
import SkillsSection from "./components/SkillsSection";
import { formatDate } from "@/utils/helpers";
import type { Application } from "@/@types/applications";
import { toast } from "sonner";

type ApplicantDetailsProps = {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ApplicantDetails({
  application,
  open,
  onOpenChange,
}: ApplicantDetailsProps) {
  const applicantId = application?.applicant_id ?? null;
  const applicationTitle = application?.job?.job_position?.position_name;
  const applicationLetter = application?.letter;
  const applicationDate = formatDate(application?.updated_at);
  // const applicationStage = application?.stage?.stage_name;

  const { data: applicantData, isLoading } = useApplicant(applicantId);
  const jobseeker = applicantData?.data;

  // sections
  const objectives = jobseeker?.objective;
  const educations = jobseeker?.education ?? [];
  const referees = jobseeker?.referees ?? [];
  const experiences = jobseeker?.experience ?? [];
  const trainings = jobseeker?.training ?? [];
  const languages = jobseeker?.language ?? [];
  const cultures = jobseeker?.culture ?? [];
  const tools = jobseeker?.tools ?? [];
  const personalities = jobseeker?.applicant_personality ?? [];
  const knowledges = jobseeker?.knowledge ?? [];
  const softwares = jobseeker?.software ?? [];
  const proficiencies = jobseeker?.proficiency ?? [];
  const careers = jobseeker?.careers ?? [];

  const profile = jobseeker?.applicant_profile?.[0];
  const location = jobseeker?.address?.[0];

  // Handlers
  const handleShortlist = () => {
    toast.success("Candidate shortlisted succesfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <Tabs defaultValue="profile">
          <TabsList variant="line">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="letter">Application Letter</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              {isLoading ? (
                <div className="flex h-40 items-center justify-center">
                  <Spinner className="size-6" />
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="flex flex-col flex-wrap gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <Avatar className="h-24 w-24">
                            <AvatarImage
                              src={
                                profile?.picture
                                  ? `${import.meta.env.VITE_BASE_URL}/${profile.picture}`
                                  : "/images/default-img.jpeg"
                              }
                              alt={profile?.first_name || "Profile"}
                            />

                            <AvatarFallback>
                              {profile?.first_name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-2xl font-bold">{`${profile?.first_name} ${profile?.middle_name} ${profile?.last_name}`}</h2>

                              {/* {profile.verified && (
                                <Badge className="gap-1">
                                  <BadgeCheck className="h-3.5 w-3.5" />
                                  Verified
                                </Badge>
                              )} */}
                            </div>
                            <p className="text-muted-foreground">
                              {jobseeker?.current_position}
                            </p>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {profile?.email}
                              </div>

                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {jobseeker?.phone?.phone_number}
                              </div>

                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {location?.region_name}, {location?.name}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download CV
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* About */}

                    {careers.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="uppercase">Summary</CardTitle>
                        </CardHeader>

                        <CardContent>
                          <p className="text-sm leading-7 text-muted-foreground">
                            {jobseeker?.careers?.[0]?.career}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {objectives && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="uppercase">
                            Objectives
                          </CardTitle>
                        </CardHeader>

                        <CardContent>
                          <p className="text-sm leading-7 text-muted-foreground">
                            {jobseeker?.objective?.objective}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {experiences.length > 0 && (
                      <ExperienceSection applicant={jobseeker} />
                    )}

                    {educations.length > 0 && (
                      <EducationSection applicant={jobseeker} />
                    )}

                    {languages.length > 0 && (
                      <LanguageSection applicant={jobseeker} />
                    )}

                    {proficiencies.length > 0 && (
                      <ProficiencySection applicant={jobseeker} />
                    )}

                    {trainings.length > 0 && (
                      <TraniningSection applicant={jobseeker} />
                    )}

                    {knowledges.length > 0 && (
                      <SkillsSection jobseeker={jobseeker} />
                    )}

                    {cultures.length > 0 && (
                      <CultureSection applicant={jobseeker} />
                    )}

                    {personalities.length > 0 && (
                      <PersonalitySection applicant={jobseeker} />
                    )}

                    {softwares.length > 0 && (
                      <SoftwareSection applicant={jobseeker} />
                    )}

                    {tools.length > 0 && <ToolsSection applicant={jobseeker} />}

                    {referees.length > 0 && (
                      <RefereeSection applicant={jobseeker} />
                    )}
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value="letter">
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              <div className="p-6 border border-gray-300 rounded bg-white space-y-4">
                <div>
                  <p className="font-semibold">
                    {profile?.first_name} {profile?.last_name}
                  </p>
                  <p> {profile?.email}</p>
                  <p>{jobseeker?.phone?.phone_number}</p>
                  <p>{applicationDate}</p>
                </div>

                <p>Dear Mr/Mrs,</p>

                <h5 className="font-semibold underline">
                  RE: APPLICATION FOR {applicationTitle} POSITION
                </h5>

                <div className="whitespace-pre-wrap">{applicationLetter}</div>

                <p>Sincerely,</p>
                <p>
                  {profile?.first_name} {profile?.last_name}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {/* <Button type="submit">
                {applicationStage === "Applied" ? "Shortlist" : "Screen"}
              </Button> */}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Shortlist Candidate</Button>
                </AlertDialogTrigger>

                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
                      <CircleQuestionMarkIcon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                      Shortlist {profile?.first_name} {profile?.last_name}?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      This applicant will be notified and moved to the
                      shortlisted candidates list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={handleShortlist}>
                      Shortlist
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
