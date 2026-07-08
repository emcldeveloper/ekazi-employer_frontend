import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Field, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import AuthLayout from "./AuthLayout";
import { Button } from "@/components/ui/button";
import { useResend, useVerification } from "@/hooks/auth";

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const { handleSubmit, reset } = useForm();

  const { mutate: verifyEmail, isPending } = useVerification();
  const { mutate: resendToken } = useResend();

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const canResend = countdown === 0;

  //   Resend Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    resendToken(
      { email: email },
      {
        onSuccess: (res) => {
          toast.success(
            res?.message || "A new verification code has been sent.",
          );
        },
        onError: (err: any) => {
          const message = err?.response?.data?.error || "Verification failed";
          toast.error(message);
        },
      },
    );

    setCountdown(60);
    setOtp("");
  };

  const onSubmit = () => {
    if (otp.length < 6) {
      toast.error("Please enter the complete verification code");
      return;
    }

    verifyEmail(
      { token: otp },
      {
        onSuccess: (res) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user_id", res.data?.id);
          localStorage.setItem("role_id", res.data?.role_id);
          localStorage.setItem("verified", res.data?.verified);

          const role = res.data?.role_id;

          // 9 as Recruiter, 5 as Employer
          if (role === 9 || role === 5) {
            navigate("/dashboard", { replace: true });
          }

          toast.success(res?.message || "Account verified successfully");

          // Redirect to dashboard
          navigate("/app/dashboard");
          reset();
          setOtp("");
        },
        onError: (err: any) => {
          const message = err?.response?.data?.error || "Verification failed";
          toast.error(message);
        },
      },
    );
  };

  return (
    <AuthLayout>
      <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
          <div className="space-y-5">
            <h1 className=" font-semibold text-Blue text-2xl">
              Verification Code
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field className="w-full">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otp}
                    onChange={setOtp}
                    className="w-full"
                  >
                    <InputOTPGroup className="w-full flex">
                      <InputOTPSlot className="flex-1 h-10 text-xl" index={0} />
                      <InputOTPSlot className="flex-1 h-10 text-xl" index={1} />
                      <InputOTPSlot className="flex-1 h-10 text-xl" index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator />

                    <InputOTPGroup className="w-full flex">
                      <InputOTPSlot className="flex-1 h-10 text-xl" index={3} />
                      <InputOTPSlot className="flex-1 h-10 text-xl" index={4} />
                      <InputOTPSlot className="flex-1 h-10 text-xl" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </Field>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPending ? "Verifying..." : "Verify Account"}
                </Button>
              </FieldGroup>
            </form>

            <div className="flex items-center">
              <p className="text-sm text-gray-600">Didn't receive the code?</p>

              {canResend ? (
                <Button variant="link" onClick={handleResend}>
                  Resend Code
                </Button>
              ) : (
                <p className="text-sm ml-2 text-gray-500">
                  Resend in{" "}
                  <span className="font-semibold text-Blue">{countdown}s</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyPage;
