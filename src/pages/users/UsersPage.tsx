import { useState } from "react";
import { UserCheckIcon, Search, UsersIcon, UserXIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

import { useUsers } from "@/hooks/users";
import CreateUser from "./components/CreateUser";
import { Spinner } from "@/components/ui/spinner";
import UpdateUser from "./components/UpdateUser";

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const { data: usersData, isLoading } = useUsers();
  const users = usersData?.data ?? [];
  const totalUsers = users.length;

  const filteredUsers = users.filter((user: any) => {
    const query = search.toLowerCase();

    return (
      user?.username?.toLowerCase().includes(query) ||
      user?.email?.toLowerCase().includes(query) ||
      user?.roles?.some((role: string) => role?.toLowerCase().includes(query))
    );
  });

  return (
    <div className="mt-4 space-y-4">
      <Card size="sm">
        <CardContent>
          <div>
            <h2 className="text-2xl font-bold">Manage Users</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View, manage, and monitor user accounts across your platform.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card size="sm" className="">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Total </h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <UsersIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Active</h3>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <UserCheckIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between ">
            <div>
              <h3 className="text-sm text-muted-foreground">Inactive</h3>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <UserXIcon size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <InputGroup className="max-w-md">
                <InputGroupInput
                  placeholder="Search user..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <InputGroupAddon>
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>

              {/* Create user button */}
              <CreateUser />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40">
                      <div className="flex items-center justify-center">
                        <Spinner className="size-6" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-20 text-center text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user: any) => (
                    <TableRow key={user?.id}>
                      <TableCell className="font-medium">
                        {user?.username}
                      </TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>
                        {user?.roles?.map((item: any) => item)}
                      </TableCell>

                      <TableCell className="text-right">
                        <UpdateUser user={user} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
