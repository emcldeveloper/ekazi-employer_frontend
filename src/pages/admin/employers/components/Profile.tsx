import {
  Building2,
  Globe,
  Mail,
  MapPin,
  MapPinPenIcon,
  Phone,
  PrinterIcon,
  Sparkle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileProps {
  employer: any;
}

const Profile = ({ employer }: ProfileProps) => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <Building2 size={16} />
            </div>
            <p className="text-base font-bold">Business Information</p>
          </div>

          <div className="grid grid-cols-[140px_1fr] gap-y-3">
            <span className="font-medium text-gray-900">Business Name:</span>
            <span className="text-muted-foreground">{employer?.business}</span>

            <span className="font-medium text-gray-900">TIN:</span>
            <span className="text-muted-foreground">{employer?.tin}</span>

            <span className="font-medium text-gray-900">Industry:</span>
            <span className="text-muted-foreground">
              {employer?.industry?.name}
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <Sparkle size={16} />
            </div>
            <p className="text-base font-bold">About Company</p>
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

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <MapPinPenIcon size={16} />
            </div>
            <p className="text-base font-bold">Location Notes</p>
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

        <div className="space-y-4">
          <p className="text-base font-bold">Contact Information</p>

          <div className="grid grid-cols-2 space-y-4">
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
  );
};

export default Profile;
