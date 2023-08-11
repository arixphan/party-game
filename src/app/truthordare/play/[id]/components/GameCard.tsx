"use client";

import { useState } from "react";
import { DocumentData } from "firebase/firestore";
import capitalize from "lodash/capitalize";
import { useParams, useRouter } from "next/navigation";

import { CloseIcon } from "@/app/shares/icon/Icon";
import { AppRoute } from "@/constants/route";

import { TruthOrDare } from "@/types/truthordare";
import { joinClasses } from "@/utils/css";

import { useGetFunction } from "../hooks/useGetFunction";

interface GameCardProps {
  className?: string;
}

export const GameCard = ({ className }: GameCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<DocumentData>();
  const [currentType, setCurrentType] = useState<TruthOrDare.Type>();
  const router = useRouter();
  const params = useParams();

  const { handleGetDare, handleGetTruth } = useGetFunction(params?.id);

  const getTruth = () => {
    setCurrentType(TruthOrDare.Type.truth);
    setCurrentQuestion(handleGetTruth());
  };

  const getDare = () => {
    setCurrentType(TruthOrDare.Type.dare);
    setCurrentQuestion(handleGetDare());
  };
  return (
    <div
      className={`bg-white drop-shadow-2xl rounded-xl border-4 border-black p-6 flex flex-col justify-between ${className}`}
    >
      {currentType && (
        <span
          className={joinClasses(
            `bg-white -mt-5 mr-auto 
          ml-auto px-4 rounded text-4xl
          font-bold 
          pointer-events-none`,
            {
              "text-blue-400": currentType === TruthOrDare.Type.truth,
              "text-red-400": currentType === TruthOrDare.Type.dare,
            }
          )}
        >
          {capitalize(currentType)}
        </span>
      )}
      <CloseIcon
        className="absolute right-2 top-2 cursor-pointer"
        onClick={() => router.push(AppRoute.TRUTH_OR_DARE.INDEX)}
      />
      <p className="font-bold text-2xl mt-2 flex-auto">
        {currentQuestion?.content}
      </p>
      <div className="flex justify-between">
        <button
          className="bg-blue-400 w-36 p-2 rounded-xl text-2xl text-white font-semibold"
          onClick={getTruth}
        >
          Truth
        </button>
        <button
          className="bg-red-400 w-36 p-2 rounded-xl text-2xl text-white font-semibold"
          onClick={getDare}
        >
          Dare
        </button>
      </div>
    </div>
  );
};
