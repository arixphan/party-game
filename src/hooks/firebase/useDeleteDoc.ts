import { doc, deleteDoc } from "firebase/firestore";
import { useCallback } from "react";
import { useFirestore } from "reactfire";

export const useDeleteDoc = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestore();

  const collectionRef = doc(firestore, path, ...pathSegments);

  return useCallback(() => deleteDoc(collectionRef), [collectionRef]);
};

export const useDeleteDocById = (path: string, ...pathSegments: string[]) => {
  const firestore = useFirestore();

  return useCallback(
    (documentId: string) => {
      const collectionRef = doc(
        firestore,
        path,
        ...[...pathSegments, documentId]
      );
      return deleteDoc(collectionRef);
    },
    [firestore, path, pathSegments]
  );
};
