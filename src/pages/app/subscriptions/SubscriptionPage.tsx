import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlan from "./components/SubscriptionPlan";
import Subscriptions from "./components/Subscriptions";
import { useState } from "react";

const SubscriptionPage = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");

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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="line">
          <TabsTrigger value="subscriptions">Subscription</TabsTrigger>
          <TabsTrigger value="plans">plans</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <Subscriptions onUpgrade={() => setActiveTab("plans")} />
        </TabsContent>
        <TabsContent value="plans">
          <SubscriptionPlan />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionPage;
