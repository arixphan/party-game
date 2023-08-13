"use client";

import { useMemo, useState } from "react";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/app/shares/button/Button";
import { ErrorMessage } from "@/app/shares/error/ErrorMessage";
import { Input, Label } from "@/app/shares/input/Input";
import { FirebaseCode } from "@/constants/firebase-code";

import { AppRoute } from "@/constants/route";
import { joinClasses } from "@/utils/css";
import { validateEmail } from "@/utils/validation";
const provider = new GoogleAuthProvider();

export const SignInForm = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseError, setResponseError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
        rule: FirebaseCode.GOOGLE_AUTH_CODE,
        errorMessage: "Something's wrong!, please try again",
        hasError: responseError === FirebaseCode.GOOGLE_AUTH_CODE,
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
    setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    ).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            router.push(AppRoute.ROOT, { shadow: false });
          }
        })
        .catch((error) => {
          setResponseError(error.code);
        })
        .finally(() => setSubmitting(false));
    });
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
      <h1 className="text-xl font-semibold">Welcome</h1>
      <small className="text-gray-400">Please enter your details</small>
      <div className="mt-4">
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="mr-auto text-xs font-semibold">Remember me</label>
          </div>
          <Link
            href={AppRoute.AUTH.FORGET_PASSWORD}
            className="text-xs font-semibold text-indigo-700"
          >
            Forgot password?
          </Link>
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
            type="button"
            variant="secondary"
            className="flex flex-wrap justify-center w-full"
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
        </div>
      </div>

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
    </form>
  );
};
