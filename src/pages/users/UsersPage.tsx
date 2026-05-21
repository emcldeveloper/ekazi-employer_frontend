import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Users from "./componens/Users";

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Manage System Users</h2>
      </div>

      <Card>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList variant="line">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <Users />
            </TabsContent>
            <TabsContent value="roles">Change your password here.</TabsContent>
            <TabsContent value="permissions">
              Change your password here.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
