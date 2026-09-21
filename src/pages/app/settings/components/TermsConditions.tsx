import type { TermCondition } from "@/@types/universals/terms-conditions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useTermsConditions } from "@/hooks/universals/terms-conditions";

const TermsConditions = () => {
  const { data: termsData, isLoading } = useTermsConditions();
  const termsConditions = termsData?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Terms and Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {termsConditions.map((term: TermCondition) => (
            <div>
              <h2 className="text-base font-medium">{term.title}</h2>
              <div
                className="prose prose-sm max-w-none
               prose-headings:font-semibold
               prose-ul:list-disc
               prose-ul:pl-6 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: term?.body,
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TermsConditions;
