import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useDocumentRef = (path: string, ...pathSegments: string[]) => {
  const documentRef = doc(useFirestore(), path, ...pathSegments);

  const observeResponse = useFirestoreDocData(documentRef);

  return useMemo(() => observeResponse, [observeResponse]);
};
