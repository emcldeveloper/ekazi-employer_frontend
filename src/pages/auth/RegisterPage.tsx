import Logo from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";

import { Onboarding } from "./Onboarding";
import {
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-2xl space-y-4">
        <Logo />

        <Card>
          <CardContent>
            <Onboarding />

            <FieldGroup>
              <FieldSeparator>Or</FieldSeparator>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-Blue hover:text-blue-600">
                  Login
                </Link>
              </FieldDescription>
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="px-6 text-sm text-center">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
