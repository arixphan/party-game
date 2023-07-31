"use client";

import {
  getAuth,
  connectAuthEmulator,
  Auth,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { AppAuthContext } from "./AuthContext";
import { useState } from "react";

let firebaseConfig = {
  apiKey: "AIzaSyDWUrY1_dvBYW6HqUc9QncX11WwXvzDbIo",
  authDomain: "party-game-34121.firebaseapp.com",
  projectId: "party-game-34121",
  storageBucket: "party-game-34121.appspot.com",
  messagingSenderId: "380048439162",
  appId: "1:380048439162:web:516482698fb540b40808c3",
  measurementId: "G-7CVSE9EHVB",
};

export const FirebaseConfigContext = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthContext>
        <FireStoreContext>{children}</FireStoreContext>
      </AuthContext>
    </FirebaseAppProvider>
  );
};

export function FireStoreContext({ children }: React.PropsWithChildren) {
  const firestoreInstance = getFirestore(useFirebaseApp());
  if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(firestoreInstance, "localhost", 8080);
  }
  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
}

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

export function AuthContext({ children }: React.PropsWithChildren) {
  const auth = getAuth(useFirebaseApp());
  const [user, setUser] = useState<User | null>(null);
  if (process.env.NODE_ENV === "development") {
    setupEmulators(auth);
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <AppAuthContext.Provider value={{ user, setUser }}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>;
    </AppAuthContext.Provider>
  );
}
