import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore } from "reactfire";

export const useUpdateDoc = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestore();

  const collectionRef = doc(firestore, path, ...pathSegments);

  return useCallback(
    (data: Record<any, any>) => updateDoc(collectionRef, data),
    [collectionRef]
  );
};

export const useUpdateDocById = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestore();

  return useCallback(
    (documentId: string, data: Record<any, any>) => {
      const collectionRef = doc(
        firestore,
        path,
        ...[...pathSegments, documentId]
      );
      return updateDoc(collectionRef, data);
    },
    [firestore, path, pathSegments]
  );
};
