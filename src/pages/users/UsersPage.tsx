import { Card, CardContent } from "@/components/ui/card";

import Users from "./componens/Users";

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Users</h2>
      </div>

      <Card>
        <CardContent>
          <Users />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
