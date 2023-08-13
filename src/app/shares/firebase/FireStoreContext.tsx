"use client";

import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

export function FireStoreContext({ children }: React.PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp());

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      connectFirestoreEmulator(firestoreInstance, "localhost", 8080);
    }
  }, []);

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
}
