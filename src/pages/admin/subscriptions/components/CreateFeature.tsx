import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FeatureForm from "../forms/FeatureForm";

const CreateFeature = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Feature</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Feature</DialogTitle>
        </DialogHeader>

        <FeatureForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeature;
