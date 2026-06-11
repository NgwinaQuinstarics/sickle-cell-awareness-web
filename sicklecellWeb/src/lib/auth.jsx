import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext({
  user: null,
  isAdmin: false,
  loading: true,
});

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({
          user: null,
          isAdmin: false,
          loading: false,
        });
        return;
      }

      try {
        // Force refresh so latest custom claims are loaded
        const tokenResult = await user.getIdTokenResult(true);

        const isAdmin = tokenResult.claims.admin === true;

        console.log("Claims:", tokenResult.claims);
        console.log("Admin:", isAdmin);

        setState({
          user,
          isAdmin,
          loading: false,
        });
      } catch (error) {
        console.error("Error reading custom claims:", error);

        setState({
          user,
          isAdmin: false,
          loading: false,
        });
      }
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
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