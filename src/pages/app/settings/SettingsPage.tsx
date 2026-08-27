import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./components/Account";
import Security from "./components/Security";
import TermsConditions from "./components/TermsConditions";

const SettingsPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>

      <Tabs defaultValue="account">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
        <TabsContent value="terms">
          <TermsConditions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
