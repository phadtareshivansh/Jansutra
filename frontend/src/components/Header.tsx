import { useAuth } from "../context/AuthContext";
import { useI18n } from "../i18n/I18nContext";
import type { Lang } from "../i18n/types";
import type { TranslationKey } from "../i18n/translations";

const NAV_LINKS: TranslationKey[] = [
  "nav.overview",
  "nav.phases",
  "nav.guide",
  "nav.privacy",
  "nav.schedule",
  "nav.assistant",
];

const ANCHORS: Record<string, string> = {
  "nav.overview": "#overview",
  "nav.phases": "#phases",
  "nav.guide": "#guide",
  "nav.privacy": "#privacy",
  "nav.schedule": "#schedule",
  "nav.assistant": "#assistant",
};

const LANGS: Lang[] = ["en", "hi", "mr", "ta"];

export default function Header() {
  const { t } = useI18n();
  const { lang, setLang, labels } = useI18n();
  const { user, signInWithGoogle, signOutUser } = useAuth();

  async function onSignIn() {
    try {
      await signInWithGoogle();
    } catch {
      /* surfaced elsewhere */
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#overview" className="brand">
          <span className="brand-flag">🇮🇳</span>
          <span>
            <span className="brand-name">{t("appName")}</span>
            <span className="brand-tag">{t("tagline")}</span>
          </span>
        </a>

        <nav className="nav">
          {NAV_LINKS.map((k) => (
            <a key={k} href={ANCHORS[k]} className="nav-link">
              {t(k)}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            aria-label="Language"
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>
                {labels[l]}
              </option>
            ))}
          </select>

          {user ? (
            <button className="btn-ghost" onClick={signOutUser}>
              {t("auth.signOut")}
            </button>
          ) : (
            <button className="btn-primary" onClick={onSignIn}>
              {t("auth.signIn")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
