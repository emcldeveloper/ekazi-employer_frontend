import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PencilLine } from "lucide-react";
import PositionForm from "./PositionForm";

const UpdatePosition = () => {
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
        <PositionForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePosition;
