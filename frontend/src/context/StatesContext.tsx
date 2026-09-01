import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "../lib/apiFetch";
import type { StateSchedule } from "../lib/types";

type StatesContextValue = {
  states: StateSchedule[];
  error: string | null;
  loading: boolean;
};

const StatesContext = createContext<StatesContextValue>({
  states: [],
  error: null,
  loading: true,
});

export function StatesProvider({ children }: { children: ReactNode }) {
  const [states, setStates] = useState<StateSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{ states: StateSchedule[] }>("/api/states")
      .then((d) => {
        if (!cancelled) setStates(d.states);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <StatesContext.Provider value={{ states, error, loading }}>
      {children}
    </StatesContext.Provider>
  );
}

export function useStates(): StatesContextValue {
  return useContext(StatesContext);
}