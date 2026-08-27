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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Subscription Plan</DialogTitle>
        </DialogHeader>

        <PlanForm plan={plan} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlan;
