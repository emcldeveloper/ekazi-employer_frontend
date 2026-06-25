import { toast } from "sonner";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateUser } from "@/hooks/users";
import type { FormValues } from "@/@types/users";
import UserForm from "./UserForm";

const CreateUser = () => {
  const { mutate: createUser, isPending } = useCreateUser();

  const handleCreate = (data: FormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
      permissions: data.permissions,
      role: data.role?.label,
      role_id: data.role?.value,
      username: data.username,
    };

    createUser(payload, {
      onSuccess: () => {
        toast.success("User created successfully");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to create user");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Add a new employer user and assign permissions.
          </DialogDescription>
        </DialogHeader>
        {/* form */}
        <UserForm
          onSubmit={handleCreate}
          isPending={isPending}
          submitLabel="Create User"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
