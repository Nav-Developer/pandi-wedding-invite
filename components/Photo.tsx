"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Photo background that drifts slowly as you scroll (parallax).
 * Fills its nearest positioned parent. The inner layer has class "kb" so GSAP can zoom it.
 */
export function ParallaxBg({
  src,
  position = "center",
  overlay,
  strength = 8,
}: {
  src: string;
  position?: string;
  overlay?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden bg-[#3d0610]">
      <motion.div style={{ y, top: "-12%", bottom: "-12%" }} className="absolute inset-x-0">
        <div
          className="kb h-full w-full bg-cover"
          style={{ backgroundImage: `url(${src})`, backgroundPosition: position }}
        />
      </motion.div>
      {overlay && <div className="absolute inset-0" style={{ background: overlay }} />}
    </div>
  );
}

/** Golden sparks drifting upward, like sparks from temple lamps. */
export function Embers({ count = 28 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const box = ref.current;
      if (!box) return;
      const w = box.offsetWidth;
      const h = box.offsetHeight;
      gsap.utils.toArray<HTMLElement>(".ember").forEach((el) => {
        const s = gsap.utils.random(2, 5);
        gsap.set(el, { x: gsap.utils.random(0, w), y: h + 20, width: s, height: s, opacity: 0 });
        gsap.to(el, { y: -40, duration: gsap.utils.random(9, 18), delay: gsap.utils.random(0, 10), repeat: -1, ease: "none" });
        gsap.to(el, { opacity: gsap.utils.random(0.4, 0.95), duration: gsap.utils.random(1.5, 3), yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(el, { x: `+=${gsap.utils.random(-50, 50)}`, duration: gsap.utils.random(3, 6), yoyo: true, repeat: -1, ease: "sine.inOut" });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ember absolute left-0 top-0 rounded-full bg-[#ffcf6b]"
          style={{ boxShadow: "0 0 8px 2px rgba(255,190,70,.8)" }}
        />
      ))}
    </div>
  );
}
