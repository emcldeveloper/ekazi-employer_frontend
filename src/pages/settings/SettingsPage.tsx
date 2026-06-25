import { Card, CardContent } from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <Card size="sm">
        <CardContent>
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your account
              {/* preferences, update company information,
              configure notifications, and customize your platform experience. */}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
