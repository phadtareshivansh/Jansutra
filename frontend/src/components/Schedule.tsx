import { useMemo, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import type { TranslationKey } from "../i18n/translations";
import { windowStatus, type WindowStatus } from "../lib/dateLogic";
import type { StateSchedule } from "../lib/types";
import Section from "./Section";

const SCALE_FACTS = [
  { label: "Budget", value: "₹11,718.24 cr" },
  { label: "Enumerators", value: "31+ lakh" },
  { label: "Villages", value: "6.39 lakh" },
  { label: "States & UTs", value: "36" },
];

const STATUS_LABEL: Record<WindowStatus, TranslationKey> = {
  open: "schedule.open",
  upcoming: "schedule.upcoming",
  past: "schedule.past",
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function getHighlight(s: StateSchedule): string {
  const se = windowStatus(s.selfEnumStart, s.selfEnumEnd);
  const hl = windowStatus(s.houseListingStart, s.houseListingEnd);
  if (se === "open") return "selfEnum";
  if (hl === "open") return "houseListing";
  return "none";
}

function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="schedule-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="schedule-card skeleton-card">
          <div className="skeleton skeleton-line w-60" />
          <div className="skeleton skeleton-line w-90" />
          <div className="skeleton skeleton-line w-90" />
        </div>
      ))}
    </div>
  );
}

export default function Schedule({ states }: { states: StateSchedule[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const loading = states.length === 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return states;
    return states.filter((s) => s.state.toLowerCase().includes(q));
  }, [states, query]);

  return (
    <Section id="schedule" title={t("schedule.title")} subtitle={t("schedule.subtitle")}>
      <input
        className="search"
        type="search"
        placeholder={t("schedule.search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />

      {loading ? (
        <SkeletonCards />
      ) : (
        <>
          <div className="schedule-grid">
            {filtered.map((s) => {
              const highlight = getHighlight(s);
              const seStatus = windowStatus(s.selfEnumStart, s.selfEnumEnd);
              const hlStatus = windowStatus(s.houseListingStart, s.houseListingEnd);
              return (
                <div key={s.state} className={`schedule-card ${highlight}`}>
                  <h3 className="schedule-state">{s.state}</h3>
                  <div className="schedule-row">
                    <span className="schedule-kind">{t("schedule.selfEnum")}</span>
                    <span className="schedule-dates">
                      {formatDate(s.selfEnumStart)} → {formatDate(s.selfEnumEnd)}
                    </span>
                    <span className={`status status-${seStatus}`}>{t(STATUS_LABEL[seStatus])}</span>
                  </div>
                  <div className="schedule-row">
                    <span className="schedule-kind">{t("schedule.houseListing")}</span>
                    <span className="schedule-dates">
                      {formatDate(s.houseListingStart)} → {formatDate(s.houseListingEnd)}
                    </span>
                    <span className={`status status-${hlStatus}`}>{t(STATUS_LABEL[hlStatus])}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="schedule-note">
            {filtered.length} {t("schedule.count")}
          </p>
        </>
      )}
    </Section>
  );
}

export function ScaleViz() {
  return (
    <div className="scale-viz">
      {SCALE_FACTS.map((f) => (
        <div key={f.label} className="scale-fact">
          <span className="scale-value">{f.value}</span>
          <span className="scale-label">{f.label}</span>
        </div>
      ))}
      <p className="scale-note">Census 2027, at a glance</p>
    </div>
  );
}
