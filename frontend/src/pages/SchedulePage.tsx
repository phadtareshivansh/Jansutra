import Schedule from "../components/Schedule";
import { useStates } from "../context/StatesContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { useI18n } from "../i18n/I18nContext";

export default function SchedulePage() {
  const { t } = useI18n();
  const { states, loading } = useStates();
  usePageTitle(`Jan Sutra — ${t("nav.schedule")}`);
  return <Schedule states={states} externalLoading={loading} />;
}