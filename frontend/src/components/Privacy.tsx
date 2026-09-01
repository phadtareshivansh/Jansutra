import { useI18n } from "../i18n/I18nContext";
import type { TranslationKey } from "../i18n/translations";
import Section from "./Section";

const MYTHS: { claim: TranslationKey; fact: TranslationKey }[] = [
  { claim: "myth.documents.claim", fact: "myth.documents.fact" },
  { claim: "myth.auth.claim", fact: "myth.auth.fact" },
];

export default function Privacy() {
  const { t } = useI18n();
  return (
    <Section id="privacy" title={t("privacy.title")} subtitle={t("privacy.subtitle")}>
      <div className="myths">
        {MYTHS.map((m, i) => (
          <div key={m.claim} className="myth-card">
            <div className="myth-vs">
              <span className="myth-tag">{i === 0 ? "Myth" : "Misinformation"}</span>
            </div>
            <p className="myth-claim">{t(m.claim)}</p>
            <div className="myth-divider" />
            <p className="myth-fact">✓ {t(m.fact)}</p>
          </div>
        ))}
      </div>
      <div className="privacy-note">🛡️ {t("privacy.act")}</div>
    </Section>
  );
}
