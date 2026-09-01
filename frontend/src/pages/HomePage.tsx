import Hero from "../components/Hero";
import ScaleSection from "../components/ScaleSection";
import RolloutSection from "../components/RolloutSection";
import { usePageTitle } from "../hooks/usePageTitle";
import { useI18n } from "../i18n/I18nContext";

export default function HomePage() {
  const { t } = useI18n();
  usePageTitle(`Jan Sutra — Census 2027 Guide`);
  return (
    <>
      <Hero />
      <ScaleSection title={t("home.scaleTitle")} />
      <RolloutSection
        title={t("home.rolloutTitle")}
        subtitle={t("home.rolloutSubtitle")}
      />
    </>
  );
}