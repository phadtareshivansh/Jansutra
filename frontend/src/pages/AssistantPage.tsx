import Assistant from "../components/Assistant";
import { usePageTitle } from "../hooks/usePageTitle";
import { useI18n } from "../i18n/I18nContext";

export default function AssistantPage() {
  const { t } = useI18n();
  usePageTitle(`Jan Sutra — ${t("nav.assistant")}`);
  return <Assistant />;
}