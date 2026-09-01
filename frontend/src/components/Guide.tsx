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
      <ol className="guide-steps">
        {steps.map((s, i) => (
          <li key={s.title} className="guide-step">
            <span className="guide-num">{i + 1}</span>
            <div>
              <h3>{t(s.title)}</h3>
              <p>{t(s.desc)}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="guide-note">
        <strong>{t("guide.selfEnumId")}:</strong> SE-XXXXX-XXXX
      </div>
    </Section>
  );
}

