import { Building2, Mail, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ApplicationsPipeline } from "./components/ApplicationsPipeline";
import Profile from "./components/Profile";
import EmployerJobs from "./components/EmployerJobs";
import Users from "./components/Users";

const EmployerDetails = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          {/* Basic Info */}
          <div className="flex gap-6">
            <div className="flex size-16 items-center justify-center rounded-xl bg-muted">
              <Building2 className="size-8 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">TechNova Solution</h1>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <Mail className="mr-1 size-3" />
                  technova@gmail.com
                </Badge>
                <Badge variant="secondary">
                  <Phone className="mr-1 size-3" />
                  0712345678
                </Badge>
                <Badge variant="secondary">
                  <MapPin className="mr-1 size-3" />
                  Dar es Salaam
                </Badge>

                <Badge variant="outline">Consultancy</Badge>
              </div>
            </div>

            {/* <Sheet>
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
                    <Input id="sheet-demo-username" defaultValue="@peduarte" />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Save changes</Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet> */}
          </div>
        </CardContent>
      </Card>

      {/* statistics */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardContent>
            <h3 className="font-semibold">Total Jobs</h3>
            <div>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Total Applications</h3>
            <div>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Active Jobs</h3>
            <div>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Users</h3>
            <div>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications pipeline */}
      <ApplicationsPipeline />

      {/* Activities */}
      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="jobs">
          <EmployerJobs />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerDetails;
