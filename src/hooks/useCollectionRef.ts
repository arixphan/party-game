import {
  DocumentData,
  QueryConstraint,
  collection,
  query,
} from "firebase/firestore";
import { useMemo } from "react";
import {
  ObservableStatus,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire";

export const useCollectionRef = (
  path: string,
  pathSegments: string[],
  ...queryConstraints: QueryConstraint[]
): ObservableStatus<DocumentData[]> => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, path, ...pathSegments);
  const collectionQuery = query(collectionRef, ...queryConstraints);

  const observeResponse = useFirestoreCollectionData(collectionQuery, {
    idField: "id",
  });

  return useMemo(() => observeResponse, [observeResponse]);
};
