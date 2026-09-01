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
          <span className="phasechip chip1">{t("hero.phase1")}</span>
          <span className="phasechip chip2">{t("hero.phase2")}</span>
        </div>
      </div>
    </section>
  );
}
