"use client";

import { useRouter } from "next/navigation";
import { CloseIcon } from "../icon/Icon";
import { AppRoute } from "@/constants/route";

interface GameCardProps {
  className?: string;
}

export const GameCard = ({ className }: GameCardProps) => {
  const router = useRouter();
  return (
    <div
      className={`bg-white drop-shadow-2xl rounded-xl border-4 border-black p-6 flex flex-col justify-between ${className}`}
    >
      <span className="bg-white -mt-5 mr-auto ml-auto px-4 rounded text-4xl font-bold text-blue-400  pointer-events-none">
        Truth
      </span>
      <CloseIcon
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => router.push(AppRoute.TRUTH_OR_DARE.INDEX)}
      />
      <p className="font-bold text-2xl mt-2 flex-auto">
        Do your best Buzz Lightyear impression. Doasdasd your best Buzz
        Lightyear impression. Do your best Buzz Lightyear impression. Do your
        best Buzz Lightyear impression.
      </p>
      <div className="flex justify-between">
        <button className="bg-blue-400 w-36 p-2 rounded-xl text-2xl text-white font-semibold">
          Truth
        </button>
        <button className="bg-red-400 w-36 p-2 rounded-xl text-2xl text-white font-semibold">
          Dare
        </button>
      </div>
    </div>
  );
};
