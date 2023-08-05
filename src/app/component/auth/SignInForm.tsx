"use client";

import Link from "next/link";
import { Input, Label } from "../input/Input";
import { AppRoute } from "@/constants/route";
import { Button } from "../button/Button";
import Image from "next/image";
import { useMemo, useState } from "react";
import { validateEmail } from "@/utils/validation";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseCode } from "@/constants/firebase-code";
import { ErrorMessage } from "../error/ErrorMessage";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseError, setResponseError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const errors = useMemo(() => {
    const hasEmailError = !!email && !validateEmail(email);
    const hasError = hasEmailError || Boolean(responseError);

    const validationResult = [
      {
        rule: FirebaseCode.USER_NOT_FOUND,
        errorMessage: "The email does not exist",
        hasError: responseError === FirebaseCode.USER_NOT_FOUND,
      },
      {
        rule: FirebaseCode.WRONG_PASSWORD,
        errorMessage: "Wrong password",
        hasError: responseError === FirebaseCode.WRONG_PASSWORD,
      },
      {
        rule: "email",
        errorMessage: "Invalid email address",
        hasError: hasEmailError,
      },
    ];

    return {
      hasError,
      validationResult,
    };
  }, [email, responseError]);

  const handleLogin = () => {
    if (submitting) return;
    setSubmitting(true);

    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            router.push(AppRoute.ROOT);
          }
        })
        .catch((error) => {
          setResponseError(error.code);
        })
        .finally(() => setSubmitting(false));
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-xl font-semibold">Welcome</h1>
      <small className="text-gray-400">Please enter your details</small>
      <form className="mt-4">
        <div className="mb-3">
          <Label className="mb-2">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value?.trim())}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <Label className="mb-2">Password</Label>
          <Input
            autoComplete="off"
            type="password"
            placeholder="*****"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 flex justify-between">
          <div className="mb-1 flex flex-wrap content-center">
            <input
              id="remember"
              type="checkbox"
              className="mr-1 checked:bg-purple-700"
            />
            <label className="mr-auto text-xs font-semibold">Remember me</label>
          </div>
          <a href="#" className="text-xs font-semibold text-indigo-700">
            Forgot password?
          </a>
        </div>
        <div className="mb-2">
          {errors.hasError &&
            errors.validationResult.map((error) => {
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

        <div className="mb-3">
          <Button className="mb-1.5 w-full" type="button" onClick={handleLogin}>
            Sign in
          </Button>
          <Button
            variant="secondary"
            className="flex flex-wrap justify-center w-full"
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
        </div>
      </form>

      <div className="text-center">
        <span className="text-xs text-gray-400 font-semibold">
          Don't have account?
        </span>{" "}
        <Link
          href={AppRoute.AUTH.REGISTER}
          className="text-xs font-semibold text-indigo-700"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
