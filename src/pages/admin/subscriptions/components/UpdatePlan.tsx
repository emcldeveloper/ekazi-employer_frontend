import { PencilLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import type { Plan } from "@/@types/subscriptions";
import PlanForm from "../forms/PlanForm";

interface UpdateplanProps {
  plan: Plan;
}

const UpdatePlan = ({ plan }: UpdateplanProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Subscription Plan</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4">
          <PlanForm plan={plan} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlan;
