import { useCallback, useEffect, useState } from "react";
import { limit, where } from "firebase/firestore";

import shuffle from "lodash/shuffle";

import { useCollectionRef, useDocumentRef } from "@/hooks";

const QUESTION_LENGTH = 10;

export const useGetDefault = (kind: string) => {
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
    if (next > daresRef.data?.length - 1) {
      next = 0;
    }
    if (next === daresRef.data?.length - 1) {
      randomDare(memoDareRandom);
    }

    setCurrentDareQuestion(next);
    return daresRef.data?.[next];
  }, [currentDareQuestion, daresRef.data, memoDareRandom, randomDare]);

  const handleGetTruth = useCallback(() => {
    let next = currentTruthQuestion + 1;
    if (next > truthsRef.data?.length - 1) {
      next = 0;
    }
    if (next === truthsRef.data?.length - 1) {
      randomTruth(memoTruthRandom);
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
