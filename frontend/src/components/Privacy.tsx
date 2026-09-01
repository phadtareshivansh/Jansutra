import { useI18n } from "../i18n/I18nContext";
import type { TranslationKey } from "../i18n/translations";
import Section from "./Section";

const MYTHS: { claim: TranslationKey; fact: TranslationKey }[] = [
  { claim: "myth.documents.claim", fact: "myth.documents.fact" },
  { claim: "myth.auth.claim", fact: "myth.auth.fact" },
  { claim: "myth.surveillance.claim", fact: "myth.surveillance.fact" },
  { claim: "myth.sold.claim", fact: "myth.sold.fact" },
];

const PROTECTION: TranslationKey[] = [
  "privacy.protection1",
  "privacy.protection2",
  "privacy.protection3",
];

export default function Privacy() {
  const { t } = useI18n();
  return (
    <Section id="privacy" title={t("privacy.title")} subtitle={t("privacy.subtitle")}>
      <div className="protection">
        <h3 className="protection-title">{t("privacy.protectionTitle")}</h3>
        <ul className="protection-list">
          {PROTECTION.map((key) => (
            <li key={key}>
              <span className="protection-check">✓</span>
              {t(key)}
            </li>
          ))}
        </ul>
      </div>

      <div className="privacy-myths">
        <h3 className="myth-heading">{t("myth.title")}</h3>
        {MYTHS.map((m, i) => (
          <details key={m.claim} className="myth-card" open={i === 0}>
            <summary className="myth-summary">
              <span className="myth-tag">Myth</span>
              <span className="myth-claim">{t(m.claim)}</span>
              <span className="myth-toggle">+</span>
            </summary>
            <div className="myth-body">
              <p className="myth-fact">✓ {t(m.fact)}</p>
            </div>
          </details>
        ))}
      </div>

      <div className="privacy-note">🛡️ {t("privacy.act")}</div>
    </Section>
  );
}
