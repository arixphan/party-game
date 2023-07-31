"use client";

import Link from "next/link";
import { Button } from "../component/button/Button";
import { Input, Label } from "../component/input/Input";
import { AppRoute } from "../constants/route";
import { SignInForm } from "../component/auth/SignInForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen shadow-md w-full justify-center items-center">
      <div className="flex flex-wrap min-h-screen md:min-h-full w-full md:w-1/4 content-center justify-center rounded-tr-3xl rounded-bl-3xl bg-white">
        <SignInForm />
      </div>
    </div>
  );
}
