import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import RangeForm from "./RangeForm";

const CreateRange = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Country</DialogTitle>
        </DialogHeader>
        <RangeForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRange;
