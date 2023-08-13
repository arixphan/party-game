"use client";

import { useMemo, useState } from "react";
import { validateEmail } from "@/utils/validation";
import { joinClasses } from "@/utils/css";
import { Input, Label } from "@/app/shares/input/Input";
import { ErrorList } from "@/app/shares/error/ErrorList";
import { Button } from "@/app/shares/button/Button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { SendEmailIcon } from "@/app/shares/icon/Icon";
import Link from "next/link";
import { AppRoute } from "@/constants/route";

interface RegisterPageProps {
  className?: string;
}

export const ForgetPasswordForm = ({ className = "" }: RegisterPageProps) => {
  const [email, setEmail] = useState<string>("");
  const [isEmailSended, setIsEmailSended] = useState(false);

  const errors = useMemo(() => {
    const hasEmailError = !validateEmail(email);
    const hasError = hasEmailError;

    const validationResult = [
      {
        rule: "email",
        errorMessage: !email?.trim()
          ? "The email address is required"
          : "The provided email address is invalid.",
        successMessage: "Email address is acceptable.",
        hasError: hasEmailError,
      },
    ];

    return {
      hasError,
      validationResult,
    };
  }, [email]);

  const sendResetPassword = () => {
    const auth = getAuth();
    setIsEmailSended(true);

    // sendPasswordResetEmail(auth, email)
    //   .then((res) => {
    //     setIsEmailSended(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  console.log(isEmailSended);
  if (isEmailSended) {
    return (
      <div
        className={joinClasses(
          "w-full max-w-sm mx-auto bg-white p-8 rounded-tr-3xl rounded-bl-3xl shadow-md",
          className
        )}
      >
        <div className="flex items-center">
          <SendEmailIcon className="w-24 h-24" />
          <p className="text-center font-semibold">
            The password reset email has been sent. Kindly check your email!
          </p>
        </div>
        <div className="flex gap-4 justify-between">
          <Button
            onClick={() => setIsEmailSended(false)}
            className="w-1/2"
            variant="secondary"
          >
            Resend
          </Button>
          <Link className="w-1/2" href={AppRoute.AUTH.LOGIN}>
            <Button className="w-full">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className={joinClasses(
        "w-full max-w-sm mx-auto bg-white p-8 rounded-tr-3xl rounded-bl-3xl shadow-md",
        className
      )}
    >
      <div className="mb-4">
        <Label htmlFor="email">Your Email</Label>
        <Input
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="dummy@example.com"
          onChange={(e) => setEmail(e.target.value?.trim())}
        />
      </div>
      <ErrorList
        validationRules={errors.validationResult}
        className="mt-3 ml-4"
      />
      <Button
        className="w-full"
        type="button"
        onClick={sendResetPassword}
        disabled={errors.hasError}
      >
        Send Email
      </Button>
    </form>
  );
};
