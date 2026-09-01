import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Phases from "./components/Phases";
import Guide from "./components/Guide";
import Privacy from "./components/Privacy";
import Schedule, { ScaleViz } from "./components/Schedule";
import DataViz from "./components/DataViz";
import Assistant from "./components/Assistant";
import Reveal from "./components/Reveal";
import { apiFetch } from "./lib/apiFetch";
import type { StateSchedule } from "./lib/types";

function App() {
  const [states, setStates] = useState<StateSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<{ states: StateSchedule[] }>("/api/states")
      .then((d) => setStates(d.states))
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="scale" className="scale-section">
          <div className="section-inner">
            <Reveal>
              <h2 className="section-title">Census 2027</h2>
            </Reveal>
            <Reveal delay={100}>
              <ScaleViz />
            </Reveal>
            {error && <p className="error">{error}</p>}
          </div>
        </section>

        <section id="rollout" className="scale-section">
          <div className="section-inner">
            <Reveal>
              <h2 className="section-title">Rollout Timeline</h2>
              <p className="section-subtitle">
                Which states begin their self-enumeration window, month by month.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <DataViz states={states} />
            </Reveal>
          </div>
        </section>

        <Phases />
        <Guide />
        <Privacy />
        <Schedule states={states} />
        <Assistant />
      </main>
      <footer className="footer">
        <p>Jan Sutra · Census 2027 Digital Enumeration</p>
      </footer>
    </>
  );
}

export default App;
