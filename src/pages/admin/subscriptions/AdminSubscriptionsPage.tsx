import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlansList from "./components/PlansList";
import FeaturesList from "./components/FeaturesList";
import SubscriptionsList from "./components/SubscriptionsList";
import PaymentsList from "./payments/PaymentsList";

const AdminSubscriptionsPage = () => {
  return (
    <div className="space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-2xl font-bold">Subscriptions</h2>
      </div>

      <Tabs defaultValue="subscriptions">
        <TabsList variant="line">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions">
          <SubscriptionsList />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsList />
        </TabsContent>
        <TabsContent value="plans">
          <PlansList />
        </TabsContent>
        <TabsContent value="features">
          <FeaturesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSubscriptionsPage;
