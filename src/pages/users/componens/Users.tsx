import { useState } from "react";
import { Plus, Search } from "lucide-react";

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

const users = [
  {
    id: 1,
    name: "Ibrahim Herith",
    email: "ibrahim.herith@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Amina Yusuf",
    email: "amina.yusuf@example.com",
    role: "Manager",
  },
  {
    id: 3,
    name: "John Michael",
    email: "john.michael@example.com",
    role: "Accountant",
  },
  {
    id: 4,
    name: "Fatma Ali",
    email: "fatma.ali@example.com",
    role: "HR",
  },
  {
    id: 5,
    name: "David Peter",
    email: "david.peter@example.com",
    role: "Support",
  },
  {
    id: 6,
    name: "Neema Charles",
    email: "neema.charles@example.com",
    role: "Editor",
  },
  {
    id: 7,
    name: "Kelvin George",
    email: "kelvin.george@example.com",
    role: "User",
  },
  {
    id: 8,
    name: "Sophia Andrew",
    email: "sophia.andrew@example.com",
    role: "Moderator",
  },
  {
    id: 9,
    name: "Hassan Omary",
    email: "hassan.omary@example.com",
    role: "User",
  },
  {
    id: 10,
    name: "Grace William",
    email: "grace.william@example.com",
    role: "Manager",
  },
];

const Users = () => {
  const [search, setSearch] = useState("");

  return (
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

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                </Field>
                <Field>
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue="@peduarte"
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>

              <TableCell className="text-right">
                <Button size="sm" variant="link">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
