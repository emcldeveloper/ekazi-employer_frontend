import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { BASE_URL } from "@/config/config";
import { useJobseeker } from "@/hooks/jobseekers";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import ExperienceSection from "../profile/ExperienceSection";
import EducationSection from "../profile/EducationSection";
import LanguageSection from "../profile/LanguageSection";
import ProficiencySection from "../profile/ProficiencySection";
import TraniningSection from "../profile/TraniningSection";
import SkillsSection from "../profile/SkillsSection";
import CultureSection from "../profile/CultureSection";
import PersonalitySection from "../profile/PersonalitySection";
import SoftwareSection from "../profile/SoftwareSection";
import { ToolsSection } from "../profile/ToolsSection";
import RefereeSection from "../profile/RefereeSection";

interface JobseekerDetailsProps {
  jobseekerId: number;
}

const JobseekerDetails = ({ jobseekerId }: JobseekerDetailsProps) => {
  const { data: jobseeker, isLoading } = useJobseeker(jobseekerId);

  const profile = jobseeker?.applicant_profile;
  const objectives = jobseeker?.objective;
  const educations = jobseeker?.education ?? [];
  const referees = jobseeker?.referees ?? [];
  const experiences = jobseeker?.experience ?? [];
  const trainings = jobseeker?.training ?? [];
  const languages = jobseeker?.language ?? [];
  const cultures = jobseeker?.culture ?? [];
  const personalities = jobseeker?.applicant_personality ?? [];
  const proficiencies = jobseeker?.proficiency ?? [];
  const knowledges = jobseeker?.skills?.knowledge ?? [];
  const softwares = jobseeker?.skills?.software ?? [];
  const tools = jobseeker?.skills?.tools ?? [];
  const location = jobseeker?.address?.[0];

  return (
    <div className="py-8 px-2">
      {isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <Spinner className="size-8" />
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
                      {jobseeker?.current_position}
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center">
                      <div className="flex items-center gap-1">
                        <MailIcon className="h-4 w-4" />
                        {profile?.email}
                      </div>

                      <div className="flex items-center gap-1">
                        <PhoneIcon className="h-4 w-4" />
                        {jobseeker?.phone?.[0]?.phone_number}
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4" />
                        {location?.sub_location}, {location?.region}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            {jobseeker?.career_summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {jobseeker?.career_summary}
                  </p>
                </CardContent>
              </Card>
            )}

            {objectives && (
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">Objectives</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {jobseeker?.objective}
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

            {languages.length > 0 && <LanguageSection languages={languages} />}

            {proficiencies.length > 0 && (
              <ProficiencySection proficiencies={proficiencies} />
            )}

            {trainings.length > 0 && <TraniningSection trainings={trainings} />}

            {knowledges.length > 0 && <SkillsSection knowledges={knowledges} />}

            {cultures.length > 0 && <CultureSection cultures={cultures} />}

            {personalities.length > 0 && (
              <PersonalitySection personalities={personalities} />
            )}

            {softwares.length > 0 && <SoftwareSection softwares={softwares} />}

            {tools.length > 0 && <ToolsSection tools={tools} />}

            {referees.length > 0 && <RefereeSection referees={referees} />}
          </div>
        </>
      )}
    </div>
  );
};

export default JobseekerDetails;
