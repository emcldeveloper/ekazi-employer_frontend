import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PencilLine } from "lucide-react";
import PermissionForm from "./PermissionForm";
import type { Permission } from "@/@types/universals/permissions";

interface UpdatePermissionProps {
  permission: Permission;
}

const UpdatePermission = ({ permission }: UpdatePermissionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-Orange">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Permission</DialogTitle>
        </DialogHeader>
        <PermissionForm permission={permission} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePermission;
