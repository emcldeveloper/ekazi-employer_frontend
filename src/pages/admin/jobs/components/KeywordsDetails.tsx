import { ShieldCheckIcon } from "lucide-react";

import type { Job } from "@/@types/job";

interface KeywordsDetailsProps {
  job: Job;
}

const KeywordsDetails = ({ job }: KeywordsDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <ShieldCheckIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Meta Keywords (SEO)</h2>
        </div>
      </div>

      <p className="leading-7 text-muted-foreground">
        {job?.meta_keywords?.[0]?.keyword?.name}
      </p>
    </div>
  );
};

export default KeywordsDetails;
