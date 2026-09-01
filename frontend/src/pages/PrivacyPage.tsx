import Privacy from "../components/Privacy";
import { usePageTitle } from "../hooks/usePageTitle";
import { useI18n } from "../i18n/I18nContext";

export default function PrivacyPage() {
  const { t } = useI18n();
  usePageTitle(`Jan Sutra — ${t("nav.privacy")}`);
  return <Privacy />;
}