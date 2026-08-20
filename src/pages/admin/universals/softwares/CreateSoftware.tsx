import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import SoftwareForm from "./SoftwareForm";

const CreateSoftware = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Country</DialogTitle>
        </DialogHeader>
        <SoftwareForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSoftware;
