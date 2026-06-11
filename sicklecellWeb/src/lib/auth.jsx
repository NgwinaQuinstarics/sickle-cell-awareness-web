import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

/**
 * Same admin model as the SickleCare mobile app:
 * a user is admin when their `users/{uid}` Firestore document
 * has `role == 'admin'`.
 */
const AuthContext = createContext({ user: null, isAdmin: false, loading: true });

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, isAdmin: false, loading: true });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      let isAdmin = false;
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        isAdmin = (snap.data()?.role ?? "user") === "admin";
      } catch {
        // profile unreadable (offline / rules) — treat as non-admin
      }
      setState({ user, isAdmin, loading: false });
    });
    return unsub;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
