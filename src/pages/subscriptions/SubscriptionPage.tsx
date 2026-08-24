import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlan from "./components/SubscriptionPlan";
import Billing from "./components/Billing";

const SubscriptionPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Subscription</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription plan, upgrade features, view billing details,
          and track payment history.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="billing">
        <TabsList variant="line">
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="plans">Upgrade plan</TabsTrigger>
        </TabsList>
        <TabsContent value="plans">
          <SubscriptionPlan />
        </TabsContent>
        <TabsContent value="billing">
          <Billing />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionPage;
