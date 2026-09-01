import { useI18n } from "../i18n/I18nContext";
import Section from "./Section";

export default function Phases() {
  const { t } = useI18n();
  return (
    <Section id="phases" title={t("phase.title")} subtitle={t("phase.intro")}>
      <div className="phases">
        <div className="phase-card">
          <span className="phase-badge badge1">1</span>
          <h3>{t("phase1.name")}</h3>
          <p className="phase-dates">{t("phase1.dates")}</p>
          <div className="phase-divider" />
          <p className="phase-collects-label">{t("phase1.collectsTitle")}</p>
          <ul className="phase-list">
            <li>{t("phase1.collects.housing")}</li>
            <li>{t("phase1.collects.amenities")}</li>
            <li>{t("phase1.collects.assets")}</li>
            <li>{t("phase1.collects.geo")}</li>
          </ul>
        </div>

        <div className="phase-card">
          <span className="phase-badge badge2">2</span>
          <h3>{t("phase2.name")}</h3>
          <p className="phase-dates">{t("phase2.dates")}</p>
          <p className="phase-ref">{t("phase2.ref")}</p>
          <div className="phase-divider" />
          <p className="phase-collects-label">{t("phase2.collectsTitle")}</p>
          <ul className="phase-list">
            <li>{t("phase2.collects.individual")}</li>
            <li>{t("phase2.collects.caste")}</li>
          </ul>
          <p className="phase-snow">{t("phase2.snow")}</p>
        </div>
      </div>
    </Section>
  );
}
