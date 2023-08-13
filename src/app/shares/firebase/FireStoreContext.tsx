"use client";

import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { memo, useEffect } from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

export const FireStoreContext = memo(function FireStoreContext({
  children,
}: React.PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      connectFirestoreEmulator(firestoreInstance, "localhost", 8080);
    }
  }, []);

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
});
