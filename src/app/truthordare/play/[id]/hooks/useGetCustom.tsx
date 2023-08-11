import { useCallback, useMemo, useState } from "react";
import { orderBy } from "firebase/firestore";

import shuffle from "lodash/shuffle";

import { useUser } from "reactfire";

import { useCollectionRef } from "@/hooks";

export const useGetCustom = (customId: string) => {
  const { data: user } = useUser();
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
