import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLine } from "lucide-react";
import SoftwareForm from "./SoftwareForm";

const UpdateSoftware = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-Orange">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Country</DialogTitle>
        </DialogHeader>
        <SoftwareForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSoftware;
