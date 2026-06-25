import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";
import type { FormValues } from "@/@types/users";
import { useUpdateUser } from "@/hooks/users";
import { toast } from "sonner";

type UpdateUserProps = {
  user: any;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const handleUpdate = (data: FormValues) => {
    const payload = {
      username: data.username,
      email: data.email,
      role: data.role?.label,
      role_id: data.role?.value,
      permissions: data.permissions,
    };

    console.log("PAYLOAD: ", payload);

    updateUser(
      {
        id: user.id,
        payload,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "User updated succesfully");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update user",
          );
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update employer user details.</DialogDescription>
        </DialogHeader>
        {/* Form */}
        <UserForm
          defaultValues={{
            username: user.username,
            email: user.email,
            password: user.password,
            role: {
              value: user.role_id,
              label: user.role,
            },
            permissions: user.permissions,
          }}
          onSubmit={handleUpdate}
          isPending={isPending}
          submitLabel="Update User"
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
