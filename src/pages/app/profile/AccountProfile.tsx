import {
  Building2,
  Calendar,
  ContactIcon,
  Globe,
  Mail,
  MapPin,
  MapPinPenIcon,
  PencilLineIcon,
  Phone,
  PrinterIcon,
  Sparkle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/profile";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/config/config";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { PERMISSIONS } from "@/constants/role-permissions";

const AccountProfile = () => {
  const navigate = useNavigate();

  const { hasPermission } = useRolePermissions();

  const { data: companyProfile, isLoading } = useProfile();
  const profile = companyProfile?.data;

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}
      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <div className="w-30">
              <img
                src={
                  profile?.logo
                    ? `${BASE_URL}/${profile.logo}`
                    : "/images/default-img.jpeg"
                }
                alt={profile?.name || "Company Logo"}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{profile?.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <Users size={16} />
                  {profile?.company_size?.name}
                </Badge>

                <Badge variant="secondary">
                  <Calendar size={16} />
                  Founded {formatDate(profile?.founded_year)}
                </Badge>
              </div>
            </div>
          </div>

          {hasPermission(PERMISSIONS.UPDATE_PROFILE) && (
            <Button onClick={handleEditProfile}>
              <PencilLineIcon size={16} />
              Update Profile
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <Building2 size={16} />
              </div>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-[140px_1fr] gap-y-3">
              <span className="font-medium text-gray-900">Business Name:</span>
              <span className="text-muted-foreground">{profile?.business}</span>

              <span className="font-medium text-gray-900">TIN:</span>
              <span className="text-muted-foreground">{profile?.tin}</span>

              <span className="font-medium text-gray-900">Industry:</span>
              <span className="text-muted-foreground">
                {profile?.industry?.name}
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <Sparkle size={16} />
              </div>
              <CardTitle>About Company</CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 leading-7 text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: profile?.description?.text,
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <MapPinPenIcon size={16} />
              </div>
              <CardTitle>Location Notes</CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 leading-7 text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: profile?.address?.location_notes,
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <ContactIcon size={16} />
              </div>
              <CardTitle>Extra Communication</CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 leading-7 text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: profile?.address?.extra_communication,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Contact */}

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${profile?.email}`}
                    className="text-primary hover:underline"
                  >
                    {profile?.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${profile?.phone}`}
                    className="text-primary hover:underline"
                  >
                    {profile?.phone}
                  </a>
                </div>
              </div>

              {profile?.fax && (
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                    <PrinterIcon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fax</p>
                    <a
                      href={`fax:${profile?.fax}`}
                      className="text-primary hover:underline"
                    >
                      {profile?.fax}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                  <Globe size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Website</p>
                  <a
                    href={profile?.address?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile?.address?.website}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <span>{`${profile?.address?.sub_location}, ${profile?.address?.region_name} ${profile?.country?.name}`}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
