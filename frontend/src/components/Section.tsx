import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = { id: string; title: string; subtitle?: string; children: ReactNode; };

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section-inner">
        <Reveal>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}