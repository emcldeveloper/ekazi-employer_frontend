import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./components/Account";
import Security from "./components/Security";
import TermsConditions from "./components/TermsConditions";

const SettingsPage = () => {
  return (
    <div className="mt-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account
        </p>
      </div>

      <Card size="sm">
        <CardContent>
          <Tabs defaultValue="account">
            <div className="w-full overflow-x-auto">
              <TabsList
                variant="line"
                className="inline-flex w-max whitespace-nowrap"
              >
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              </TabsList>
            </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
