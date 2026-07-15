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
import { BASE_URL } from "@/config/config";

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
  const applicantId = application?.applicant_id;
  const applicationTitle = application?.job?.job_position?.position_name;
  const applicationLetter = application?.letter;
  const applicationDate = formatDate(application?.updated_at);
  // const applicationStage = application?.stage?.stage_name;

  const { data: applicant, isLoading } = useApplicant(applicantId ?? 0);

  // sections
  const profile = applicant?.applicant_profile;
  const objectives = applicant?.objective;
  const educations = applicant?.education ?? [];
  const referees = applicant?.referees ?? [];
  const experiences = applicant?.experience ?? [];
  const trainings = applicant?.training ?? [];
  const languages = applicant?.language ?? [];
  const cultures = applicant?.culture ?? [];
  const personalities = applicant?.applicant_personality ?? [];
  const proficiencies = applicant?.proficiency ?? [];

  // skills (tools, knowledge, softwares)
  const knowledges = applicant?.skills?.knowledge ?? [];
  const softwares = applicant?.skills?.software ?? [];
  const tools = applicant?.skills?.tools ?? [];

  const location = applicant?.address?.[0];

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
                                  ? `${BASE_URL}/${profile.picture}`
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
                              {applicant?.current_position}
                            </p>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {profile?.email}
                              </div>

                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {applicant?.phone?.[0]?.phone_number}
                              </div>

                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {location?.sub_location}, {location?.region}
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
                    {applicant?.career_summary && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="uppercase">Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-7 text-muted-foreground">
                            {applicant?.career_summary}
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
                            {applicant?.objective}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {experiences.length > 0 && (
                      <ExperienceSection experiences={experiences} />
                    )}

                    {educations.length > 0 && (
                      <EducationSection educations={educations} />
                    )}

                    {languages.length > 0 && (
                      <LanguageSection languages={languages} />
                    )}

                    {proficiencies.length > 0 && (
                      <ProficiencySection proficiencies={proficiencies} />
                    )}

                    {trainings.length > 0 && (
                      <TraniningSection trainings={trainings} />
                    )}

                    {knowledges.length > 0 && (
                      <SkillsSection knowledges={knowledges} />
                    )}

                    {cultures.length > 0 && (
                      <CultureSection cultures={cultures} />
                    )}

                    {personalities.length > 0 && (
                      <PersonalitySection personalities={personalities} />
                    )}

                    {softwares.length > 0 && (
                      <SoftwareSection softwares={softwares} />
                    )}

                    {tools.length > 0 && <ToolsSection tools={tools} />}

                    {referees.length > 0 && (
                      <RefereeSection referees={referees} />
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
                  <p>{applicant?.phone?.phone_number}</p>
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
