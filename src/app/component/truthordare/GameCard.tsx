"use client";

import { useParams, useRouter } from "next/navigation";
import { CloseIcon } from "../icon/Icon";
import { AppRoute } from "@/constants/route";
import { useCollectionRef } from "@/hooks/useCollectionRef";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppAuthContext } from "../firebase/AuthContext";
import { DocumentData, limit, orderBy, where } from "firebase/firestore";
import shuffle from "lodash/shuffle";
import capitalize from "lodash/capitalize";
import { TruthOrDare } from "@/types/truthordare";
import { joinClasses } from "@/utils/css";
import { useDocumentRef } from "@/hooks/useDocumentRef";

interface GameCardProps {
  className?: string;
}

const QUESTION_LENGTH = 10;

function getFirstTenAndRemaining(inputArray: string[]) {
  if (!Array.isArray(inputArray) || inputArray.length === 0) {
    return {
      firstTenNumbers: [],
      remainingNumbers: [],
    };
  }

  const firstTenNumbers = inputArray.slice(0, QUESTION_LENGTH);
  const remainingNumbers = inputArray.slice(QUESTION_LENGTH);

  return {
    firstTenNumbers: firstTenNumbers,
    remainingNumbers: remainingNumbers,
  };
}

const useGetDefault = (kind: string) => {
  const suiteRef = useDocumentRef("truthordare", kind);
  const truthCounter = suiteRef?.data?.truthCounter || 0;
  const dareCounter = suiteRef?.data?.dareCounter || 0;
  const [currentTruthRandom, setCurrentTruthRandom] = useState<string[]>([]);
  const [currentDareRandom, setCurrentDareRandom] = useState<string[]>([]);
  const [currentTruthQuestion, setCurrentTruthQuestion] = useState<number>(-1);
  const [currentDareQuestion, setCurrentDareQuestion] = useState<number>(-1);
  const [memoTruthRandom, setMemoTruthRandom] = useState<string[]>([]);
  const [memoDareRandom, setMemoDareRandom] = useState<string[]>([]);
  const truthsRef = useCollectionRef(
    "truthordare",
    [kind, "truth"],
    currentTruthRandom.length > 0
      ? where("id", "in", currentTruthRandom)
      : limit(2)
  );

  console.log("truthsRef", truthsRef.status);

  const daresRef = useCollectionRef(
    "truthordare",
    [kind, "dare"],
    currentDareRandom.length > 0
      ? where("id", "in", currentDareRandom)
      : limit(2)
  );

  const randomTruth = useCallback(
    (ids: string[]) => {
      const { firstTenNumbers, remainingNumbers } =
        getFirstTenAndRemaining(ids);
      if (remainingNumbers.length === 0) {
        const shuffleArray = shuffle(
          Array.from({ length: truthCounter }, (_, index) => String(index + 1))
        );
        setMemoTruthRandom(shuffleArray);
      } else {
        setMemoTruthRandom(remainingNumbers);
      }

      setCurrentTruthRandom(firstTenNumbers);
    },
    [truthCounter]
  );

  const randomDare = useCallback(
    (ids: string[]) => {
      const { firstTenNumbers, remainingNumbers } =
        getFirstTenAndRemaining(ids);
      setMemoDareRandom(remainingNumbers);

      if (remainingNumbers.length === 0) {
        const shuffleArray = shuffle(
          Array.from({ length: dareCounter }, (_, index) => String(index + 1))
        );
        setMemoDareRandom(shuffleArray);
      } else {
        setMemoDareRandom(remainingNumbers);
      }

      setCurrentDareRandom(firstTenNumbers);
    },
    [dareCounter]
  );

  const handleGetDare = useCallback(() => {
    let next = currentDareQuestion + 1;
    if (next === daresRef.data?.length - 1) {
      randomDare(memoDareRandom);
    }
    if (next > daresRef.data?.length - 1) {
      next = 0;
    }
    setCurrentDareQuestion(next);
    return daresRef.data?.[next];
  }, [currentDareQuestion, daresRef.data, memoDareRandom, randomDare]);

  const handleGetTruth = useCallback(() => {
    let next = currentTruthQuestion + 1;
    if (next === truthsRef.data?.length - 1) {
      randomTruth(memoTruthRandom);
    }
    if (next > truthsRef.data?.length - 1) {
      next = 0;
    }
    setCurrentTruthQuestion(next);
    return truthsRef.data?.[next];
  }, [currentTruthQuestion, memoTruthRandom, randomTruth, truthsRef.data]);

  useEffect(() => {
    const shuffleArray = shuffle(
      Array.from({ length: truthCounter }, (_, index) => String(index + 1))
    );
    randomTruth(shuffleArray);
  }, [truthCounter]);

  useEffect(() => {
    const shuffleArray = shuffle(
      Array.from({ length: dareCounter }, (_, index) => String(index + 1))
    );
    randomDare(shuffleArray);
  }, [dareCounter]);

  return {
    handleGetTruth,
    handleGetDare,
  };
};

const useGetCustom = (customId: string) => {
  const { user } = useContext(AppAuthContext);
  const [currentTruthIndex, setCurrentTruthIndex] = useState(-1);
  const [currentDareIndex, setCurrentDareIndex] = useState(-1);

  const { status: truthStatus, data: truthData } = useCollectionRef(
    user?.uid || "does_not_existed",
    ["truthordare", "suites", customId, "truth"],
    orderBy("createdAt", "desc")
  );

  const { status: dareStatus, data: dareData } = useCollectionRef(
    user?.uid || "does_not_existed",
    ["truthordare", "suites", customId, "dare"],
    orderBy("createdAt", "desc")
  );

  const shuffleTruthQuestion = useMemo(() => {
    return shuffle(truthData || []);
  }, [truthData]);

  const shuffleDareQuestion = useMemo(() => {
    return shuffle(dareData || []);
  }, [dareData]);

  const handleGetTruth = useCallback(() => {
    let next = currentTruthIndex + 1;
    if (next > shuffleTruthQuestion.length - 1) {
      next = 0;
    }
    setCurrentTruthIndex(next);
    return shuffleTruthQuestion[next];
  }, [currentTruthIndex, shuffleTruthQuestion]);

  const handleGetDare = useCallback(() => {
    let next = currentDareIndex + 1;
    if (next > shuffleDareQuestion.length - 1) {
      next = 0;
    }
    setCurrentDareIndex(next);
    return shuffleDareQuestion[next];
  }, [currentDareIndex, shuffleDareQuestion]);

  return {
    handleGetTruth,
    handleGetDare,
  };
};

const useGetFunction = (id: string) => {
  if (!id) {
    return {
      handleGetTruth: () => undefined,
      handleGetDare: () => undefined,
    };
  }

  let getHook = useGetCustom;
  if (["common", "adult", "couple"].includes(id)) {
    getHook = useGetDefault;
  }
  return getHook(id);
};

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
