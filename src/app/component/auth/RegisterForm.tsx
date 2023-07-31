"use client";

import { joinClasses } from "@/app/utils/css";
import { useMemo, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AppRoute } from "@/app/constants/route";
import { Button } from "../button/Button";
import { Input, Label } from "../input/Input";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/app/utils/validation";
import { ErrorList } from "../error/ErrorList";
import { FirebaseCode } from "@/app/constants/firebase-code";
import { ErrorMessage } from "../error/ErrorMessage";

interface RegisterPageProps {
  className?: string;
}

export const RegisterForm = ({ className = "" }: RegisterPageProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [responseError, setResponseError] = useState("");
  const router = useRouter();

  const errors = useMemo(() => {
    const minPasswordLength = password.length < 7;
    const passwordMatch = password !== passwordConfirm || minPasswordLength;
    const hasEmailError = !validateEmail(email);
    const hasError = minPasswordLength || passwordMatch || hasEmailError;

    const validationResult = [
      {
        rule: "email",
        errorMessage: "Invalid email address",
        successMessage: "Valid email address",
        hasError: hasEmailError,
      },
      {
        rule: "minLength",
        errorMessage: "At least 8 characters required",
        successMessage: "The minimum length is reached",
        hasError: minPasswordLength,
      },
      {
        rule: "matchPassword",
        errorMessage: "Passwords do not match",
        successMessage: "Passwords match",
        hasError: password !== passwordConfirm || minPasswordLength,
      },
    ];

    return {
      hasError,
      validationResult,
    };
  }, [password, passwordConfirm, email]);

  const responseErrors = useMemo(() => {
    const hasError = Boolean(responseError);

    const validationResult = [
      {
        rule: FirebaseCode.EMAIL_ALREADY_IN_USER,
        errorMessage: "The email is already in use",
        hasError: responseError === FirebaseCode.EMAIL_ALREADY_IN_USER,
      },
    ];

    return {
      hasError,
      validationResult,
    };
  }, [responseError]);

  const handleRegister = () => {
    if (errors.hasError || submitting) return;
    setSubmitting(true);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          router.push(AppRoute.ROOT);
        }
      })
      .catch((error) => {
        setResponseError(error.code);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form
      className={joinClasses(
        "w-full max-w-sm mx-auto bg-white p-8 rounded-tr-3xl rounded-bl-3xl shadow-md",
        className
      )}
    >
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
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
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          autoComplete="off"
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="********"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <ErrorList
        validationRules={errors.validationResult}
        className="mt-3 ml-4"
      />
      <div className="mb-2 ml-5">
        {responseErrors.hasError &&
          responseErrors.validationResult.map((error) => {
            if (error.hasError) {
              return (
                <ErrorMessage
                  key={error.rule}
                  errorMessage={error.errorMessage}
                />
              );
            }
            return null;
          })}
      </div>
      <Button type="button" onClick={handleRegister} disabled={errors.hasError}>
        Register
      </Button>
    </form>
  );
};
