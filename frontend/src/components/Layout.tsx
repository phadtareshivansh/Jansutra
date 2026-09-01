import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useI18n } from "../i18n/I18nContext";

export default function Layout() {
  const { t } = useI18n();
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-desc">{t("footer.description")}</p>
          <p className="footer-built">{t("footer.builtFor")}</p>
          <p className="footer-disclaimer">⚠️ {t("footer.disclaimer")}</p>
        </div>
      </footer>
    </>
  );
}