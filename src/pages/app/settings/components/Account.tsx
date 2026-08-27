import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useUser } from "@/hooks/auth";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Account = () => {
  const { data: userData } = useUser();

  const user = userData?.data;

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <form action="" className="space-y-4">
            <FieldGroup>
              <Field className="flex-row">
                <FieldLabel>Username</FieldLabel>
                <Input defaultValue={user?.username} disabled />
              </Field>

              <Field className="flex-row">
                <FieldLabel>Email address</FieldLabel>
                <Input type="email" defaultValue={user?.email} disabled />
              </Field>
            </FieldGroup>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Account;
