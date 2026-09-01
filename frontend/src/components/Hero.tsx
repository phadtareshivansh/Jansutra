import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section id="overview" className="hero">
      <div className="hero-inner">
        <span className="hero-eyebrow">🇮🇳 Jan Sutra</span>
        <h1 className="hero-title">{t("hero.title")}</h1>
        <p className="hero-subtitle">{t("hero.subtitle")}</p>
        <div className="hero-phases">
          <Link to="/phases" className="phasechip chip1 hero-chip-link">
            {t("hero.phase1")}
          </Link>
          <Link to="/phases" className="phasechip chip2 hero-chip-link">
            {t("hero.phase2")}
          </Link>
        </div>
        <div className="hero-ctas">
          <Link to="/self-enumeration" className="btn-primary btn-lg">
            {t("hero.ctaGuide")}
          </Link>
          <Link to="/schedule" className="btn-ghost btn-lg">
            {t("hero.ctaSchedule")}
          </Link>
        </div>
      </div>
    </section>
  );
}