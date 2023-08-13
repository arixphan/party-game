"use client";

import { useMemo, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { Button } from "@/app/shares/button/Button";
import { ErrorList } from "@/app/shares/error/ErrorList";
import { ErrorMessage } from "@/app/shares/error/ErrorMessage";
import { Input, Label } from "@/app/shares/input/Input";
import { FirebaseCode } from "@/constants/firebase-code";
import { AppRoute } from "@/constants/route";
import { joinClasses } from "@/utils/css";
import { validateEmail } from "@/utils/validation";
import Image from "next/image";

interface RegisterPageProps {
  className?: string;
}
const provider = new GoogleAuthProvider();

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
        errorMessage: !email?.trim()
          ? "The email address is required"
          : "The provided email address is invalid.",
        successMessage: "Email address is acceptable.",
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
      {
        rule: FirebaseCode.GOOGLE_AUTH_CODE,
        errorMessage: "Something's wrong!, please try again",
        hasError: responseError === FirebaseCode.GOOGLE_AUTH_CODE,
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

  const handleLoginWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          router.push(AppRoute.ROOT, { shadow: false });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setResponseError(FirebaseCode.GOOGLE_AUTH_CODE);
      });
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
      <Button
        className="w-full"
        type="button"
        onClick={handleRegister}
        disabled={errors.hasError}
      >
        Register
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="mt-2 flex flex-wrap justify-center w-full"
        onClick={handleLoginWithGoogle}
      >
        <Image
          alt="Google Icon"
          width={20}
          height={20}
          className="mr-2"
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
        />
        Sign in with Google
      </Button>
    </form>
  );
};
