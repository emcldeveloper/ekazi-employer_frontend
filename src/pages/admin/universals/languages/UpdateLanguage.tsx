import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PencilLine } from "lucide-react";
import LanguageForm from "./LanguageForm";

const UpdateLanguage = () => {
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
        <LanguageForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLanguage;
