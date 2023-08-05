"use client";

import { TruthOrDare } from "@/types/truthordare";
import { useState } from "react";

interface SwitchButtonProps {
  value: TruthOrDare.Type;
  onChange: (value: TruthOrDare.Type) => void;
}

export const SwitchButton = ({ value, onChange }: SwitchButtonProps) => {
  const handleToggle = (event: any) => {
    if (event.target.classList.contains("left-[125px]")) {
      onChange(TruthOrDare.Type.truth);
      event.target.classList.remove("left-[125px]");
      event.target.classList.remove("bg-red-600");
      event.target.classList.add("left-1");
      event.target.classList.add("bg-indigo-600");
    } else {
      onChange(TruthOrDare.Type.dare);
      event.target.classList.remove("bg-indigo-600");
      event.target.classList.remove("left-1");
      event.target.classList.add("left-[125px]");
      event.target.classList.add("bg-red-600");
    }
  };

  return (
    <div className="bg-white mx-auto mb-4 w-64 shadow rounded-full h-10 flex relative items-center">
      <div className="w-full flex justify-center">
        <button>Truth</button>
      </div>
      <div className="w-full flex justify-center">
        <button>Dare</button>
      </div>
      <span
        onClick={handleToggle}
        className="bg-indigo-600 shadow text-white flex items-center 
        justify-center w-1/2 rounded-full h-8 
        transition-all top-[4px] absolute left-1 select-none cursor-pointer"
      >
        {value === TruthOrDare.Type.truth ? "Truth" : "Dare"}
      </span>
    </div>
  );
};
