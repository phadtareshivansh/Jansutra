import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { translations, LANG_LABELS } from "./translations";
import type { Lang } from "./types";
import type { TranslationKey } from "./translations";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  labels: typeof LANG_LABELS;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => translations[lang][key],
      labels: LANG_LABELS,
    }),
    [lang]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
