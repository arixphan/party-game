"use client";

import { User } from "firebase/auth";
import { createContext } from "react";

type AppAuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const AppAuthContext = createContext<AppAuthContextType>({
  user: null,
  setUser: () => undefined,
});
