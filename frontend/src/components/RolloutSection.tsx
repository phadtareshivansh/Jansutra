import DataViz from "./DataViz";
import Reveal from "./Reveal";
import { useStates } from "../context/StatesContext";

export default function RolloutSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { states } = useStates();
  return (
    <section id="rollout" className="scale-section">
      <div className="section-inner">
        <Reveal>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </Reveal>
        <Reveal delay={100}>
          <DataViz states={states} />
        </Reveal>
      </div>
    </section>
  );
}