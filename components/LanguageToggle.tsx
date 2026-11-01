"use client";

import { motion } from "framer-motion";
import { useLang } from "./LangProvider";

const options = [
  { key: "en", label: "EN" },
  { key: "ta", label: "தமிழ்" },
] as const;

/** Fixed top-right switch: EN | தமிழ் */
export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      role="group"
      aria-label="Language"
      className="fixed right-3 z-[60] flex rounded-full border border-[#d4af37]/80 bg-[#2a0510]/70 p-1 shadow-lg backdrop-blur-md"
      style={{ top: "max(12px, env(safe-area-inset-top))" }}
    >
      {options.map((o) => {
        const active = lang === o.key;
        return (
          <button
            key={o.key}
            onClick={() => setLang(o.key)}
            aria-pressed={active}
            className="relative rounded-full px-3.5 py-1.5 text-sm leading-none"
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[#f7d77a] to-[#c9972b]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative font-tamil font-semibold ${active ? "text-[#3d0610]" : "text-[#f7d77a]"}`}
            >
              {o.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}
