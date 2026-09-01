import { useI18n } from "../i18n/I18nContext";
import type { TranslationKey } from "../i18n/translations";
import Section from "./Section";

export default function Guide() {
  const { t } = useI18n();
  const steps = [
    { title: "guide.step1.title" as TranslationKey, desc: "guide.step1.desc" as TranslationKey },
    { title: "guide.step2.title" as TranslationKey, desc: "guide.step2.desc" as TranslationKey },
    { title: "guide.step3.title" as TranslationKey, desc: "guide.step3.desc" as TranslationKey },
    { title: "guide.step4.title" as TranslationKey, desc: "guide.step4.desc" as TranslationKey },
    { title: "guide.step5.title" as TranslationKey, desc: "guide.step5.desc" as TranslationKey },
  ];

  return (
    <Section id="guide" title={t("guide.title")} subtitle={t("guide.subtitle")}>
      <div className="guide-stepper">
        {steps.map((s, i) => (
          <div key={s.title} className="guide-step">
            <div className="guide-step-left">
              <span className="guide-num">{i + 1}</span>
              {i < steps.length - 1 && <span className="guide-connector" />}
            </div>
            <div className="guide-step-content">
              <h3>{t(s.title)}</h3>
              <p>{t(s.desc)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="guide-nodocs">
        <span className="guide-nodocs-icon">📋</span>
        <div>
          <strong>{t("guide.noDocsTitle")}</strong>
          <p>{t("guide.noDocsDesc")}</p>
        </div>
      </div>

      <div className="guide-note">
        <strong>{t("guide.selfEnumId")}:</strong> SE-XXXXX-XXXX
      </div>
    </Section>
  );
}
