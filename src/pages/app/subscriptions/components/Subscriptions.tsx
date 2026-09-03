import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useClientSubscriptions } from "@/hooks/subscriptions";
import { formatCurrency, formatDate } from "@/utils/helpers";

interface SubscriptionsProps {
  onUpgrade: () => void;
}

const Subscriptions = ({ onUpgrade }: SubscriptionsProps) => {
  const { data: subscriptionsData, isLoading } = useClientSubscriptions();
  const subscription = subscriptionsData?.data;

  // Replace this with your API data
  // const subscription = {
  //   plan: {
  //     name: "Employer Basic",
  //     price: 1000,
  //     current_type: "monthly",
  //     job_post_limit: 5,
  //     cv_download_limit: 10,
  //   },
  //   end_date: "2026-09-27T07:54:48.000Z",
  //   remaining_days: 26,
  //   job_post_remaining: 2,
  //   cv_download_remaining: 5,
  //   is_active: true,
  // };

  const jobPostUsed =
    subscription?.plan?.job_post_limit - subscription?.job_post_remaining;

  const cvDownloadUsed =
    subscription?.plan?.cv_download_limit - subscription?.cv_download_remaining;

  const jobPostProgress =
    (jobPostUsed / subscription?.plan?.job_post_limit) * 100;

  const cvDownloadProgress =
    (cvDownloadUsed / subscription?.plan?.cv_download_limit) * 100;

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold">
                  {subscription?.plan.name}
                </h2>

                {subscription?.is_active && (
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    Active
                  </Badge>
                )}
              </div>

              {/* Subscription info */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4" />
                  {formatCurrency(subscription?.plan?.price)} /{" "}
                  {subscription?.plan?.current_type}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Renews {formatDate(subscription?.end_date)}
                </span>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="text-left md:text-right">
                <p className="text-xs text-muted-foreground">Current plan</p>
                <p className="text-2xl font-bold tracking-tight">
                  {formatCurrency(subscription?.plan?.price)}
                </p>
              </div>

              <Button onClick={onUpgrade}>Upgrade Plan</Button>
            </div>
          </div>

          {/* Divider */}
          <Separator />

          {/* Remaining days */}
          <div className="flex items-center justify-between rounded-lg bg-muted/50">
            <div>
              <p className="text-base font-semibold">Subscription period</p>
              <p className="text-muted-foreground">
                Your current plan expires on{" "}
                {formatDate(subscription?.end_date)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">
                {subscription?.remaining_days}
              </p>
              <p className="text-muted-foreground">days remaining</p>
            </div>
          </div>

          {/* Divider */}
          <Separator />

          {/* Usage */}
          <div>
            <div className="mb-4">
              <h3 className="text-base font-semibold">Plan usage</h3>
              <p className="text-sm text-muted-foreground">
                Track your remaining resources for this billing period.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Job posts */}
              <Card>
                <CardContent>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        <BriefcaseBusiness className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">Job posts</p>
                        <p className="text-xs text-muted-foreground">
                          {jobPostUsed} used
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold">
                      {subscription?.job_post_remaining}/
                      {subscription?.plan.job_post_limit}
                    </span>
                  </div>

                  <Progress value={jobPostProgress} className="h-2" />

                  <p className="mt-2 text-xs text-muted-foreground">
                    {subscription?.job_post_remaining} job{" "}
                    {subscription?.job_post_remaining === 1 ? "post" : "posts"}{" "}
                    remaining
                  </p>
                </CardContent>
              </Card>

              {/* CV downloads */}
              <Card>
                <CardContent>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        <FileText className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">CV downloads</p>
                        <p className="text-xs text-muted-foreground">
                          {cvDownloadUsed} used
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold">
                      {subscription?.cv_download_remaining}/
                      {subscription?.plan.cv_download_limit}
                    </span>
                  </div>

                  <Progress value={cvDownloadProgress} className="h-2" />

                  <p className="mt-2 text-xs text-muted-foreground">
                    {subscription?.cv_download_remaining} downloads remaining
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscriptions;
