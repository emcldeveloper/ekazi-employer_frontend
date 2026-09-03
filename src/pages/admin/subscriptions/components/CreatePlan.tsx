import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import PlanForm from "../forms/PlanForm";

const CreatePlan = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Subscription Plan</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4">
          <PlanForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlan;
