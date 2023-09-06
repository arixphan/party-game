"use client";

import { usePathname } from "next/navigation";
import PageHeader from "./Header";
import { AppRoute } from "@/constants/route";
import React from "react";

export const LayoutProvider = () => {
  const pathname = usePathname();

  const headerSlot = getHeaderSlot(pathname);

  return <PageHeader>{headerSlot}</PageHeader>;
};

export const getHeaderSlot = (path: string): React.ReactNode => {
  if (path.startsWith(AppRoute.TRUTH_OR_DARE.INDEX)) {
    return (
      <div className="px-4 rounded-lg text-3xl pointer-events-none">
        <span className="text-blue-400 font-extrabold">Truth </span>
        <span className="font-extrabold text-gray-300">Or</span>
        <span className="text-red-400 font-extrabold"> Dare</span>
      </div>
    );
  }
  if (path.startsWith(AppRoute.RANDOM.RANDOM_PICKER)) {
    return (
      <div className="px-4 rounded-lg text-3xl font-black text-fuchsia-700 pointer-events-none">
        Random Picker
      </div>
    );
  }

  if (path.startsWith(AppRoute.RANDOM.WHEEL_OF_BEER)) {
    return (
      <div className="px-4 rounded-lg text-3xl font-black text-yellow-500 pointer-events-none">
        Wheel of Beer
      </div>
    );
  }
  return (
    <div className="px-4 rounded-lg text-3xl font-black  pointer-events-none">
      <span className="text-yellow-500">Game On!</span>{" "}
      <span style={{ color: "#6140B0" }}>Together</span>
    </div>
  );
};
