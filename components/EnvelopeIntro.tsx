"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "./LangProvider";

gsap.registerPlugin(useGSAP);

type Props = { onOpened: () => void };

/**
 * GSAP-driven envelope: idle float -> tap -> seal pops, flap opens (3D),
 * inner card rises, whole envelope drops away, then calls onOpened().
 */
export default function EnvelopeIntro({ onOpened }: Props) {
  const { c } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);
  const idle = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // entrance
      gsap.from(".env-wrap", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".env-hint", { opacity: 0, y: 10, delay: 1, duration: 0.8 });
      // idle float + hint pulse
      idle.current = gsap.to(".env-wrap", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
      gsap.to(".env-hint", {
        opacity: 0.45,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.8,
      });
      gsap.to(".env-seal", {
        scale: 1.06,
        duration: 1.1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  const open = () => {
    if (opening) return;
    setOpening(true);
    idle.current?.kill();
    gsap.killTweensOf([".env-hint", ".env-seal"]);

    const tl = gsap.timeline({ onComplete: onOpened });
    tl.to(".env-hint", { opacity: 0, duration: 0.3 })
      .to(".env-wrap", { y: 0, duration: 0.4, ease: "power2.out" }, "<")
      // seal breaks
      .to(".env-seal", {
        scale: 1.4,
        rotate: 20,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(2)",
      })
      // flap opens
      .to(
        ".env-flap",
        {
          rotateX: -180,
          duration: 0.9,
          ease: "power2.inOut",
          transformOrigin: "top center",
        },
        "-=0.1",
      )
      .set(".env-flap", { zIndex: 0 })
      // inner card rises out
      .to(".env-card", { y: -170, duration: 0.9, ease: "power3.out" }, "-=0.2")
      // envelope falls away, card scales up
      .to(
        ".env-body",
        { y: 260, opacity: 0, duration: 0.8, ease: "power2.in" },
        "+=0.15",
      )
      .to(
        ".env-flap",
        { y: 260, opacity: 0, duration: 0.8, ease: "power2.in" },
        "<",
      )
      .to(
        ".env-card",
        {
          y: -40,
          scale: 1.25,
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<0.2",
      )
      .to(root.current, { opacity: 0, duration: 0.5 }, "-=0.3");
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-40 flex h-dvh flex-col items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #fff4d6 0%, #f3d9a0 55%, #d9a85a 100%)",
      }}
    >
      <p className="mb-10 text-center font-display text-base tracking-[0.25em] text-[#7a0f1c] uppercase sm:text-xl sm:tracking-[0.3em]">
        {c.envelopeTitle}
      </p>

      <div
        className="env-wrap relative cursor-pointer select-none"
        style={{ perspective: 1200 }}
        onClick={open}
      >
        <div className="relative aspect-[19/13] w-[min(86vw,400px)]">
          {/* inner card (peeks out) */}
          <div
            className="env-card absolute left-[8%] top-[6%] flex h-[88%] w-[84%] items-center justify-center rounded-sm border border-[#c9a24d] bg-[#fff8e4] shadow-md"
            style={{ zIndex: 1 }}
          >
            <span className="font-script text-3xl leading-[1.3] text-[#7a0f1c]">
              {c.envelopeNames}
            </span>
          </div>

          {/* envelope body (front pocket) */}
          <div
            className="env-body absolute inset-0 rounded-md shadow-2xl"
            style={{
              zIndex: 2,
              background: "linear-gradient(160deg,#9c1426,#6e0b19)",
              clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)",
              borderRadius: 6,
            }}
          />
          {/* gold trim lines */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex: 3,
              background:
                "linear-gradient(to top right, transparent 49.6%, #d4af37 50%, transparent 50.4%) 0 0/50% 100% no-repeat, linear-gradient(to top left, transparent 49.6%, #d4af37 50%, transparent 50.4%) 100% 0/50% 100% no-repeat",
              opacity: 0.0,
            }}
          />

          {/* flap */}
          <div
            className="env-flap absolute left-0 top-0 h-[55%] w-full"
            style={{
              zIndex: 4,
              transformStyle: "preserve-3d",
              background: "linear-gradient(180deg,#b01a30,#8a1022)",
              clipPath: "polygon(0 0, 100% 0, 50% 95%)",
              filter: "drop-shadow(0 4px 4px rgba(0,0,0,.3))",
            }}
          />

          {/* wax seal */}
          <div
            className="env-seal absolute left-1/2 top-[44%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-[#fbe7a1] shadow-lg"
            style={{
              zIndex: 5,
              background:
                "radial-gradient(circle at 35% 30%, #d4283f, #7a0f1c 70%)",
              border: "2px solid #d4af37",
            }}
          >
            ♥
          </div>
        </div>
      </div>

      <p className="env-hint mt-14 font-display text-sm tracking-[0.35em] text-[#7a0f1c] uppercase">
        {c.envelopeHint}
      </p>
    </div>
  );
}
