"use client";

import { usePathname } from "next/navigation";
import PageHeader from "./Header";
import { AppRoute } from "@/app/constants/route";
import React from "react";

export const LayoutProvider = () => {
  const pathname = usePathname();
  if (pathname === AppRoute.AUTH.LOGIN) return null;

  const headerSlot = getHeaderSlot(pathname);

  return <PageHeader>{headerSlot}</PageHeader>;
};

export const getHeaderSlot = (path: string): React.ReactNode => {
  if (path.startsWith(AppRoute.TRUTH_OR_DARE.INDEX)) {
    return (
      <div className="bg-gray-200 px-4 rounded-lg text-2xl pointer-events-none">
        <span className="text-blue-400 font-extrabold">Truth </span>
        <span className="font-extrabold">Or</span>
        <span className="text-red-400 font-extrabold"> Dare</span>
      </div>
    );
  }
  return null;
};
