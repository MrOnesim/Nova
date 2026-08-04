import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./locale";
import { detectLanguageByIp } from "./ipLanguage";

const STORAGE_KEY = "pretnova-lang";
const LANGS: Lang[] = ["fr", "es", "de", "it", "pt", "nl", "sk"];
const DEFAULT_LANG: Lang = "es";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readSaved(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  } catch {}
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readSaved() ?? DEFAULT_LANG);

  useEffect(() => {
    if (readSaved()) return;
    let active = true;
    detectLanguageByIp().then((l) => {
      if (active) setLangState(l);
    });
    return () => {
      active = false;
    };
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}