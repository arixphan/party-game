"use client";

import { memo, useEffect } from "react";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";

import { firebaseConfig } from "@/config/firebase";

export const FirebaseConfigContext = memo(function FirebaseConfigContext({
  children,
}: React.PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthContext>
        <FireStoreContext>{children}</FireStoreContext>
      </AuthContext>
    </FirebaseAppProvider>
  );
});

export const FireStoreContext = memo(function FireStoreContext({
  children,
}: React.PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp());
  if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(firestoreInstance, "localhost", 8080);
  }
  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
});

async function setupEmulators(auth: Auth) {
  const authUrl = "http://localhost:9099";
  try {
    fetch(authUrl);
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export const AuthContext = memo(function AuthContext({
  children,
}: React.PropsWithChildren) {
  const auth = getAuth(useFirebaseApp());

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setupEmulators(auth);
    }
  }, []);

  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
});
