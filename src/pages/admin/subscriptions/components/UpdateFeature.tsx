import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PencilLine } from "lucide-react";
import FeatureForm from "../forms/FeatureForm";
import type { Feature } from "@/@types/subscriptions";

interface UpdateFeatureProps {
  feature: Feature;
}

const UpdateFeature = ({ feature }: UpdateFeatureProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Feature</DialogTitle>
        </DialogHeader>

        <FeatureForm feature={feature} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeature;
