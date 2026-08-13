import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "Admin",
    verified: true,
    status: "Active",
    createdAt: "2026-05-01",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    role: "Employer",
    verified: true,
    status: "Active",
    createdAt: "2026-04-22",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@gmail.com",
    role: "Recruiter",
    verified: false,
    status: "Not Active",
    createdAt: "2026-03-15",
  },
  {
    id: 4,
    name: "Amina Yusuf",
    email: "amina.yusuf@gmail.com",
    role: "Job Seeker",
    verified: true,
    status: "Active",
    createdAt: "2026-02-10",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@gmail.com",
    role: "Employer",
    verified: false,
    status: "Not Active",
    createdAt: "2026-01-28",
  },
];

const Users = () => {
  const handleView = (id: number) => {
    console.log("View user:", id);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>

                <TableCell>{user.verified ? "Yes" : "No"}</TableCell>

                <TableCell>{user.status}</TableCell>

                <TableCell>{user.createdAt}</TableCell>

                <TableCell className="text-right">
                  <Button variant="link" onClick={() => handleView(user.id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Users;
