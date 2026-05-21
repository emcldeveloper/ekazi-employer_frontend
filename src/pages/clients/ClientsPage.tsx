import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const clients = [
  {
    id: 1,
    companyName: "TechNova Ltd",
    contactPerson: "Ibrahim Herith",
    email: "contact@technova.co.tz",
    industry: "Technology",
    status: "Active",
  },
  {
    id: 2,
    companyName: "Safari Logistics",
    contactPerson: "Amina Yusuf",
    email: "info@safarilogistics.com",
    industry: "Logistics",
    status: "Active",
  },
  {
    id: 3,
    companyName: "Afya Care Hospital",
    contactPerson: "Dr. John Michael",
    email: "hr@afyacare.co.tz",
    industry: "Healthcare",
    status: "Active",
  },
  {
    id: 4,
    companyName: "Green Harvest",
    contactPerson: "Fatma Ali",
    email: "jobs@greenharvest.co.tz",
    industry: "Agriculture",
    status: "Pending",
  },
  {
    id: 5,
    companyName: "Urban Properties",
    contactPerson: "David Peter",
    email: "careers@urbanproperties.com",
    industry: "Real Estate",
    status: "Active",
  },
  {
    id: 6,
    companyName: "Vision Media",
    contactPerson: "Neema Charles",
    email: "hr@visionmedia.co.tz",
    industry: "Media",
    status: "Inactive",
  },
  {
    id: 7,
    companyName: "Blue Ocean Finance",
    contactPerson: "Kelvin George",
    email: "recruitment@blueocean.co.tz",
    industry: "Finance",
    status: "Active",
  },
  {
    id: 8,
    companyName: "BuildMaster Engineering",
    contactPerson: "Sophia Andrew",
    email: "jobs@buildmaster.com",
    industry: "Engineering",
    status: "Pending",
  },
  {
    id: 9,
    companyName: "Elite Security",
    contactPerson: "Hassan Omary",
    email: "admin@elitesecurity.co.tz",
    industry: "Security",
    status: "Active",
  },
  {
    id: 10,
    companyName: "Bright Education Group",
    contactPerson: "Grace William",
    email: "careers@brightedu.co.tz",
    industry: "Education",
    status: "Active",
  },
];

const ClientsPage = () => {
  const [search, setSearch] = useState("");

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      [client.companyName, client.contactPerson, client.email, client.industry]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl font-bold">Clients</h2>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Client</DialogTitle>

                <DialogDescription>
                  Add a new client company profile.
                </DialogDescription>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <Label htmlFor="companyName">Company Name</Label>

                  <Input id="companyName" placeholder="Enter company name" />
                </Field>

                <Field>
                  <Label htmlFor="contactPerson">Contact Person</Label>

                  <Input
                    id="contactPerson"
                    placeholder="Enter contact person"
                  />
                </Field>

                <Field>
                  <Label htmlFor="email">Email</Label>

                  <Input id="email" type="email" placeholder="Enter email" />
                </Field>

                <Field>
                  <Label htmlFor="industry">Industry</Label>

                  <Input id="industry" placeholder="Enter industry" />
                </Field>
              </FieldGroup>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button type="submit">Save Client</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.companyName}
                  </TableCell>

                  <TableCell>{client.contactPerson}</TableCell>

                  <TableCell>{client.email}</TableCell>

                  <TableCell>{client.industry}</TableCell>

                  <TableCell>{client.status}</TableCell>

                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="link">
                      <Link to={`/clients/${client.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
