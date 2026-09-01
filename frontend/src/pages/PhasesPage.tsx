import Phases from "../components/Phases";
import { usePageTitle } from "../hooks/usePageTitle";
import { useI18n } from "../i18n/I18nContext";

export default function PhasesPage() {
  const { t } = useI18n();
  usePageTitle(`Jan Sutra — ${t("nav.phases")}`);
  return <Phases />;
}