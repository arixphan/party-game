import { QueryConstraint, collection, query } from "firebase/firestore";
import { useMemo } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

export const useFirestoreCollection = (
  path: string,
  pathSegments: string[],
  ...queryConstraints: QueryConstraint[]
) => {
  const firestore = useFirestore();
  const collectionRef = collection(firestore, path, ...pathSegments);
  const collectionQuery = query(collectionRef, ...queryConstraints);

  const observeResponse = useFirestoreCollectionData(collectionQuery, {
    idField: "id",
  });

  return useMemo(() => observeResponse, [observeResponse]);
};
