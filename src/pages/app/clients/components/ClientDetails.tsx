import { Building2, Globe, Mail, MapPin, Phone, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const client = {
  id: 1,
  companyName: "TechNova Ltd",
  industry: "Technology",
  status: "Active",
  email: "contact@technova.co.tz",
  phone: "+255 712 345 678",
  website: "www.technova.co.tz",
  location: "Dar es Salaam, Tanzania",
  employees: 120,
  foundedYear: 2018,
  description:
    "TechNova Ltd is a fast-growing technology company specializing in software development, cloud solutions, and digital transformation services across East Africa.",

  contactPerson: {
    name: "Ibrahim Herith",
    role: "HR Manager",
    email: "ibrahim@technova.co.tz",
    phone: "+255 754 000 111",
  },
};

const ClientDetails = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Building2 className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{client.companyName}</h1>

            <p className="text-muted-foreground">{client.industry}</p>
          </div>
        </div>

        <Badge className="w-fit">{client.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-muted-foreground">
                {client.description}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.website}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.employees} Employees</span>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">Founded {client.foundedYear}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Job Activity</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Senior Frontend Developer</h3>

                  <p className="text-sm text-muted-foreground">
                    Posted 3 days ago
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">UI/UX Designer</h3>

                  <p className="text-sm text-muted-foreground">
                    Posted 1 week ago
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">DevOps Engineer</h3>

                  <p className="text-sm text-muted-foreground">
                    Posted 2 weeks ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Contact</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{client.contactPerson.name}</h3>

                <p className="text-sm text-muted-foreground">
                  {client.contactPerson.role}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.contactPerson.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />

                  <span className="text-sm">{client.contactPerson.phone}</span>
                </div>
              </div>

              <Button className="w-full">Create Job For Client</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
