"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const COLORS = ["#c8102e", "#e63946", "#ffffff", "#fff3c4", "#f4b942"];

/** Falling flower petals (jasmine + rose) driven by GSAP. */
export default function Petals({ count = 22 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".petal").forEach((el) => {
        const size = gsap.utils.random(8, 16);
        gsap.set(el, {
          x: gsap.utils.random(0, window.innerWidth),
          y: -40,
          width: size,
          height: size * 1.4,
          rotate: gsap.utils.random(0, 360),
          opacity: gsap.utils.random(0.5, 0.95),
          backgroundColor: gsap.utils.random(COLORS),
        });
        gsap.to(el, {
          y: window.innerHeight + 60,
          duration: gsap.utils.random(7, 14),
          delay: gsap.utils.random(0, 8),
          ease: "none",
          repeat: -1,
        });
        gsap.to(el, {
          x: `+=${gsap.utils.random(-80, 80)}`,
          rotate: `+=${gsap.utils.random(120, 360)}`,
          duration: gsap.utils.random(3, 6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="petal absolute left-0 top-0" style={{ borderRadius: "60% 40% 60% 40%" }} />
      ))}
    </div>
  );
}
