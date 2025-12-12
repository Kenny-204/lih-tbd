"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  type User,
  type UserCredential,
} from "firebase/auth";

interface value {
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => void;
  passwordReset: (email: string) => Promise<void>;
  currentUser: User | null | undefined;
  isAuthenticated: boolean;
}

const AuthContext = createContext<value | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Auth provider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  async function signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  function passwordReset(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signOut() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    signOut,
    passwordReset,
    isAuthenticated: currentUser != null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
