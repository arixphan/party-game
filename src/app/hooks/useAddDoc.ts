import { addDoc, collection } from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore } from "reactfire";

export const useAddDoc = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestore();

  const collectionRef = collection(firestore, path, ...pathSegments);

  return useCallback(
    (data: Record<any, any>) => addDoc(collectionRef, data),
    [collectionRef]
  );
};
