import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, googleProvider, isFirebaseConfigured } from "../lib/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  enabled: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
  /** Resolve the current Firebase ID token, or null when unauth/disabled. */
  getIdToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const enabled = isFirebaseConfigured();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signInWithGoogle(): Promise<User | null> {
    const auth = getFirebaseAuth();
    if (!auth) return null;
    const result = await signInWithPopup(auth, googleProvider);
    setUser(result.user);
    return result.user;
  }

  async function signOutUser(): Promise<void> {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
    setUser(null);
  }

  async function getIdToken(): Promise<string | null> {
    const auth = getFirebaseAuth();
    if (!auth) return null;
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    try {
      return await currentUser.getIdToken();
    } catch {
      return null;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, enabled, signInWithGoogle, signOutUser, getIdToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
