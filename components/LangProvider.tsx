"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { content, type Content, type Lang } from "@/data/content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; c: Content };

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  c: content.en,
});

const KEY = "invite-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Change "en" to "ta" here if you want the invitation to open in Tamil first.
  const [lang, setLangState] = useState<Lang>("en");

  // remember the guest's choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "ta") setLangState(saved);
    } catch {
      /* storage blocked: ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, c: content[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
