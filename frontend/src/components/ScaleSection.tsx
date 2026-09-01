import { ScaleViz } from "./Schedule";
import Reveal from "./Reveal";
import { useStates } from "../context/StatesContext";

export default function ScaleSection({ title }: { title: string }) {
  const { error } = useStates();
  return (
    <section id="scale" className="scale-section">
      <div className="section-inner">
        <Reveal>
          <h2 className="section-title">{title}</h2>
        </Reveal>
        <Reveal delay={100}>
          <ScaleViz />
        </Reveal>
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
}