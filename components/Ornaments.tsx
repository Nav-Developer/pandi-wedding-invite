"use client";

import { motion } from "framer-motion";

/** Oil lamp with a flickering flame. */
export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <circle cx="30" cy="24" r="20" fill="#ffb300" opacity=".16" />
      <motion.g
        style={{ transformOrigin: "30px 33px" }}
        animate={{ scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.92, 1.05, 0.95, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M30 6 C39 16 40 25 30 33 C20 25 21 16 30 6Z" fill="#ff9800" />
        <path d="M30 15 C34 20 35 25 30 30 C25 25 26 20 30 15Z" fill="#fff3b0" />
      </motion.g>
      <path d="M6 36 Q30 62 54 36 Z" fill="#c9a24d" />
      <path d="M6 36 H54" stroke="#8a6a1e" strokeWidth="2" />
    </svg>
  );
}

/** Kolam-style divider with a rosette in the middle. */
export function KolamDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 24" className={className} fill="currentColor" aria-hidden>
      <line x1="10" x2="132" y1="12" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="188" x2="310" y1="12" y2="12" stroke="currentColor" strokeWidth="1" />
      {[20, 40, 60, 80, 100, 120, 200, 220, 240, 260, 280, 300].map((x) => (
        <circle key={x} cx={x} cy="12" r="1.8" />
      ))}
      {[0, 45, 90, 135].map((a) => (
        <ellipse key={a} cx="160" cy="12" rx="10" ry="3.4" transform={`rotate(${a} 160 12)`} opacity=".85" />
      ))}
      <circle cx="160" cy="12" r="2.6" fill="#2a0510" />
    </svg>
  );
}

/** Scroll-triggered reveal: fades up out of a soft blur. */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
