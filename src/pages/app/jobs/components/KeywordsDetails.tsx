import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, PencilLineIcon, ShieldCheckIcon } from "lucide-react";
import MetaForm from "../forms/MetaForm";
import { useState } from "react";
import type { Job } from "@/@types/job";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { PERMISSIONS } from "@/constants/role-permissions";

interface KeywordsDetailsProps {
  job: Job;
}

const KeywordsDetails = ({ job }: KeywordsDetailsProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { hasPermission } = useRolePermissions();

  const metaData = job?.meta_keywords?.[0]?.keyword?.name
    ?.replace(/<[^>]*>/g, "")
    .trim();

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <ShieldCheckIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Meta Keywords (SEO)</h2>
        </div>

        {hasPermission(PERMISSIONS.EDIT_JOB) && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <PencilLineIcon className="mr-2 size-4" />
                {metaData ? "Edit" : "Add"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl overflow-visible">
              <DialogHeader>
                <DialogTitle>Meta Keywords (SEO)</DialogTitle>
                <DialogDescription>Edit job meta keywords.</DialogDescription>
              </DialogHeader>

              <div className="-mx-4 max-h-[70vh] px-4">
                <MetaForm
                  job={job}
                  onSuccess={() => setOpen(false)}
                  onLoadingChange={setIsSubmitting}
                />
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" form="meta-form" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <p className="leading-7 text-muted-foreground">
        {job?.meta_keywords?.[0]?.keyword?.name}
      </p>
    </div>
  );
};

export default KeywordsDetails;
