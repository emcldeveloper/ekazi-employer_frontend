import {
  Building2,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/profile";
import { useNavigate } from "react-router-dom";

const AccountProfile = () => {
  const navigate = useNavigate();
  const { data: companyProfile, isLoading } = useProfile();
  const profile = companyProfile?.data;

  console.log(profile);

  const handleEditProfile = () => {
    navigate("/profile/create");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="pt-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-40">
            <img src={profile?.logo} alt={profile?.name} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold">{profile?.name}</h1>

              {/* <Badge>
                <BadgeCheck className="mr-1 h-3 w-3" />
                Verified
              </Badge> */}
            </div>

            {/* <p className="mt-2 text-muted-foreground">{company.tagline}</p> */}

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {profile?.industtry_name}
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {profile?.company_size}
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Founded {profile?.founded_year}
              </div>
            </div>
          </div>

          <Button onClick={handleEditProfile}>
            <Pencil className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                <span className="text-gray-900">Business Name:</span>{" "}
                {profile?.business}
              </p>
              <p className="leading-7 text-muted-foreground">
                {" "}
                <span className="text-gray-900">TIN:</span> {profile?.tin}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Company</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="leading-7 text-muted-foreground">
                {profile?.description}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Contact */}

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{profile?.website}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{`${profile?.sub_location}, ${profile?.region} ${profile?.country}`}</span>
              </div>
            </CardContent>
          </Card>

          {/* Team */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>

              <CardDescription>Users added to this account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {company.team.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <h4 className="font-medium">{member.name}</h4>

                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card> */}

          {/* Verification */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Badge className="w-full justify-center py-2">
                Company Verified
              </Badge>

              <p className="text-sm text-muted-foreground">
                Your company documents have been reviewed and approved.
              </p>
            </CardContent>
          </Card> */}

          {/* Subscription */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="font-semibold">Professional Plan</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Expires: 30 June 2026
              </p>

              <Button variant="outline" className="mt-4 w-full">
                Manage Subscription
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
