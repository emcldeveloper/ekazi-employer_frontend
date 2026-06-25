import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLineIcon, ShieldCheckIcon } from "lucide-react";
import MetaForm from "./MetaForm";
import { useState } from "react";

interface KeywordsDetailsProps {
  job: any;
}

const KeywordsDetails = ({ job }: KeywordsDetailsProps) => {
  const [open, setOpen] = useState(false);

  const metaData = job?.job_meta_keywords?.meta_keyword?.name
    ?.replace(/<[^>]*>/g, "")
    .trim();

  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <ShieldCheckIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Meta Keywords (SEO)</h2>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <PencilLineIcon className="mr-2 size-4" />
              {metaData ? "Edit" : "Add"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Meta Keywords (SEO)</DialogTitle>
              <DialogDescription>Edit job meta keywords.</DialogDescription>
            </DialogHeader>
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              {/* <MetaForm /> */}
              <MetaForm job={job} onSuccess={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <p className="leading-7 text-muted-foreground">
        {job?.job_meta_keywords?.meta_keyword?.name}
      </p>
    </div>
  );
};

export default KeywordsDetails;
