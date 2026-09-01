import Guide from "../components/Guide";
import { usePageTitle } from "../hooks/usePageTitle";
import { useI18n } from "../i18n/I18nContext";

export default function SelfEnumerationPage() {
  const { t } = useI18n();
  usePageTitle(`Jan Sutra — ${t("nav.guide")}`);
  return <Guide />;
}