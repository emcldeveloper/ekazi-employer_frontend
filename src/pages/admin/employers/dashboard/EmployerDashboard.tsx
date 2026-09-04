import { useEmployer } from "@/hooks/employers/useEmployer";
import { useParams } from "react-router-dom";
import {
  Building2,
  Calendar,
  ContactIcon,
  Globe,
  Mail,
  MapPin,
  MapPinPenIcon,
  Phone,
  PrinterIcon,
  Sparkle,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/config/config";
import { Separator } from "@/components/ui/separator";

const EmployerDashboard = () => {
  const { id } = useParams();
  const employerId = Number(id);

  const { data: employer, isLoading } = useEmployer(employerId);

  if (isLoading) {
    return <div className="flex items-center justify-between">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <div className="w-30">
              <img
                src={
                  employer?.logo
                    ? `${BASE_URL}/${employer.logo}`
                    : "/images/default-img.jpeg"
                }
                alt={employer?.name || "Company Logo"}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{employer?.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <Users size={16} />
                  {employer?.company_size?.name}
                </Badge>

                <Badge variant="secondary">
                  <Calendar size={16} />
                  Founded {formatDate(employer?.founded_year)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <Building2 size={16} />
              </div>
              <CardTitle>Business Information</CardTitle>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-y-3">
              <span className="font-medium text-gray-900">Business Name:</span>
              <span className="text-muted-foreground">
                {employer?.business}
              </span>

              <span className="font-medium text-gray-900">TIN:</span>
              <span className="text-muted-foreground">{employer?.tin}</span>

              <span className="font-medium text-gray-900">Industry:</span>
              <span className="text-muted-foreground">
                {employer?.industry?.name}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <Sparkle size={16} />
              </div>
              <p>About Company</p>
            </div>

            <div
              className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 leading-7 text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: employer?.description?.text,
              }}
            />
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <MapPinPenIcon size={16} />
              </div>
              <p>Location Notes</p>
            </div>

            <div
              className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 leading-7 text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: employer?.address?.location_notes,
              }}
            />
          </div>

          <Separator />

          <div>
            <p>Contact Information</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${employer?.email}`}
                    className="text-primary hover:underline"
                  >
                    {employer?.email}
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
                    href={`tel:${employer?.phone}`}
                    className="text-primary hover:underline"
                  >
                    {employer?.phone}
                  </a>
                </div>
              </div>

              {employer?.fax && (
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                    <PrinterIcon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Fax</p>
                    <a
                      href={`fax:${employer?.fax}`}
                      className="text-primary hover:underline"
                    >
                      {employer?.fax}
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
                    href={employer?.address?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {employer?.address?.website}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <span>{`${employer?.address?.sub_location}, ${employer?.address?.region_name} ${employer?.country?.name}`}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
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
                  __html: employer?.address?.extra_communication,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">{/* Contact */}</div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
