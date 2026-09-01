import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { apiFetch } from "./lib/apiFetch";

type StateSchedule = {
  id: number;
  state: string;
  selfEnumStart: string;
  selfEnumEnd: string;
  houseListingStart: string;
  houseListingEnd: string;
};

function App() {
  const { user, loading, enabled, signInWithGoogle, signOutUser } = useAuth();
  const [states, setStates] = useState<StateSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [authMsg, setAuthMsg] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<{ states: StateSchedule[] }>("/api/states")
      .then((d) => setStates(d.states))
      .catch((e) => setError(e.message));
  }, []);

  async function handleSignIn() {
    try {
      const u = await signInWithGoogle();
      setAuthMsg(u ? `Signed in as ${u.email}` : "Firebase Auth is not configured");
    } catch (e) {
      setAuthMsg(e instanceof Error ? e.message : "Sign-in failed");
    }
  }

  async function handleSignOut() {
    await signOutUser();
    setAuthMsg("Signed out");
  }

  return (
    <div className="container">
      <h1>PromptWars</h1>
      <p className="subtitle">Census 2027 · Digital Enumeration</p>

      <div className="card">
        <h2>Firebase Auth</h2>
        {!enabled && (
          <p className="loading">
            Firebase Auth not configured. Add VITE_FIREBASE_* env vars to enable
            Google sign-in.
          </p>
        )}
        {!loading && enabled && (
          <>
            {user ? (
              <>
                <p className="success">Signed in as {user.email}</p>
                <button onClick={handleSignOut}>Sign out</button>
              </>
            ) : (
              <button onClick={handleSignIn}>Sign in with Google</button>
            )}
          </>
        )}
        {authMsg && <p className="error">{authMsg}</p>}
      </div>

      <div className="card">
        <h2>States Endpoint</h2>
        {error && <p className="error">Error: {error}</p>}
        {states.length === 0 && !error && <p className="loading">Loading...</p>}
        <ul className="statelist">
          {states.map((s) => (
            <li key={s.state}>
              <strong>{s.state}</strong> — Self-enum{" "}
              {formatDate(s.selfEnumStart)} to {formatDate(s.selfEnumEnd)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default App;
