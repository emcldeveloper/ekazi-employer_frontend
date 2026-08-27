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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Subscription Plan</DialogTitle>
        </DialogHeader>

        <PlanForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlan;
