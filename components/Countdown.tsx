"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { useLang } from "./LangProvider";

const TARGET = new Date(invitation.countdownTarget).getTime();

function Box({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex w-[22%] max-w-[100px] flex-col items-center">
      <div className="relative flex h-16 w-full items-center justify-center overflow-hidden rounded-t-full rounded-b-lg border-2 border-[#d4af37] bg-gradient-to-b from-[#7a1020] to-[#4a0812] shadow-lg sm:h-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display text-2xl font-bold text-[#ffe9a8] sm:text-4xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-center font-display text-[10px] tracking-widest text-[#5c0a16] uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { c } = useLang();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now !== null && now >= TARGET) {
    return (
      <p className="font-script text-4xl text-[#8b0f20] sm:text-5xl">
        {c.today}
      </p>
    );
  }

  const sec = now === null ? null : Math.floor((TARGET - now) / 1000);

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-5">
      <Box
        value={sec === null ? null : Math.floor(sec / 86400)}
        label={c.days}
      />
      <Box
        value={sec === null ? null : Math.floor((sec % 86400) / 3600)}
        label={c.hours}
      />
      <Box
        value={sec === null ? null : Math.floor((sec % 3600) / 60)}
        label={c.minutes}
      />
      <Box value={sec === null ? null : sec % 60} label={c.seconds} />
    </div>
  );
}
