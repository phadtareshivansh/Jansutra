import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../i18n/I18nContext";
import type { Lang } from "../i18n/types";
import type { TranslationKey } from "../i18n/translations";

const NAV_LINKS: { key: TranslationKey; to: string }[] = [
  { key: "nav.overview", to: "/" },
  { key: "nav.phases", to: "/phases" },
  { key: "nav.guide", to: "/self-enumeration" },
  { key: "nav.privacy", to: "/privacy" },
  { key: "nav.schedule", to: "/schedule" },
  { key: "nav.assistant", to: "/assistant" },
];

const LANGS: Lang[] = ["en", "hi", "mr", "ta"];

export default function Header() {
  const { t } = useI18n();
  const { lang, setLang, labels } = useI18n();
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  async function onSignIn() {
    try {
      await signInWithGoogle();
    } catch {
      /* surfaced elsewhere */
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-flag">🇮🇳</span>
          <span>
            <span className="brand-name">{t("appName")}</span>
            <span className="brand-tag">{t("tagline")}</span>
          </span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.key}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
              onClick={closeMenu}
              end={l.to === "/"}
            >
              {t(l.key)}
            </NavLink>
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