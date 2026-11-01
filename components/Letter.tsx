"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { Diya, KolamDivider, Reveal } from "./Ornaments";
import { Embers, ParallaxBg } from "./Photo";
import { useLang } from "./LangProvider";
import Countdown from "./Countdown";
import Actions from "./Actions";

const nameSize = { fontSize: "clamp(3rem, 14vw, 5.5rem)" };
const [engDate, wedDate] = invitation.events;

/* ---------- 1. HERO: sunset gopuram ---------- */
function Hero() {
  const { c } = useLang();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // slow cinematic zoom-out of the photo
      gsap.fromTo(
        ".kb",
        { scale: 1.35 },
        { scale: 1.08, duration: 9, ease: "power2.out" },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh flex-col items-center overflow-hidden px-6 pb-14 pt-20 text-center text-[#fff3d0]"
    >
      <ParallaxBg
        src={invitation.images.hero}
        position="50% 85%"
        overlay="linear-gradient(180deg, rgba(36,5,12,.85) 0%, rgba(36,5,12,.5) 36%, rgba(36,5,12,.15) 60%, rgba(36,5,12,.9) 100%)"
      />
      <Embers />

      <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center">
        <Reveal>
          <p className="font-display text-base tracking-[0.2em] text-[#f7d77a]">
            {c.blessingTop}
          </p>
          <p className="mt-1 font-serif text-lg italic text-[#fbe9c0]">
            {c.blessing}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-6 font-display text-sm tracking-[0.25em] text-[#fff3d0] uppercase">
            {c.heading}
          </p>
          <KolamDivider className="mx-auto mt-2 w-48 text-[#d4af37]" />
        </Reveal>

        <div className="mt-5">
          <motion.h1
            initial={{ opacity: 0, x: -70, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="gold-text px-3 font-script leading-[1.25]"
            style={nameSize}
          >
            {c.groom}
          </motion.h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="text-xl text-[#ff5a6e]"
          >
            ❤
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: 70, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="gold-text px-3 font-script leading-[1.25]"
            style={nameSize}
          >
            {c.bride}
          </motion.h1>
        </div>

        <Reveal delay={1.5}>
          <div className="mt-6 font-serif text-lg text-[#fbe9c0]">
            {c.tagline.map((l: any) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1.8} className="mt-auto pt-16">
          <div className="flex items-center justify-center gap-3 font-display tracking-[0.3em] text-[#f7d77a]">
            <span className="h-px w-8 bg-[#d4af37]" />
            <span className="text-sm sm:text-base">
              {engDate.day} &amp; {wedDate.day} ·{" "}
              {c.events[1].month.toUpperCase()} · {wedDate.year}
            </span>
            <span className="h-px w-8 bg-[#d4af37]" />
          </div>
          <motion.p
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-5 font-display text-[10px] tracking-[0.4em] text-[#fbe9c0] uppercase"
          >
            {c.scroll}
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 2. CELEBRATIONS: lamp hall ---------- */
function EventCard({ i }: { i: number }) {
  const { c } = useLang();
  const base = invitation.events[i];
  const t = c.events[i];
  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-t-[999px] rounded-b-2xl border border-[#d4af37]/70 bg-[#2a0510]/60 px-6 pb-8 pt-16 text-center shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-md"
    >
      <Diya className="absolute left-1/2 top-3 w-12 -translate-x-1/2" />
      <h3 className="font-display text-lg tracking-[0.2em] text-[#fff3d0] uppercase">
        {t.title}
      </h3>
      <KolamDivider className="mx-auto my-3 w-40 text-[#d4af37]" />

      <p className="gold-text font-display text-7xl font-bold leading-none">
        {base.day}
      </p>
      <p className="mt-2 font-display text-sm tracking-[0.3em] uppercase">
        {t.month} {base.year}
      </p>
      <p className="mt-1 font-serif text-lg italic text-[#fbe9c0]">
        {t.weekday}
      </p>

      <div className="mx-auto mt-4 w-fit rounded-full border border-[#d4af37] px-5 py-1.5 font-serif text-xl font-semibold text-[#ffe9a8]">
        🕕 {t.time}
      </div>
      {t.note && (
        <p className="mx-auto mt-4 max-w-xs font-serif text-base text-[#fbe9c0]">
          {t.note}
        </p>
      )}
    </motion.article>
  );
}

function Celebrations() {
  const { c } = useLang();
  return (
    <section
      className="relative overflow-hidden px-5 py-24 text-center text-[#fff3d0]"
      style={{ perspective: 1200 }}
    >
      <ParallaxBg
        src={invitation.images.lamps}
        position="50% 50%"
        overlay="linear-gradient(180deg, rgba(30,4,10,.92) 0%, rgba(30,4,10,.72) 45%, rgba(30,4,10,.9) 100%)"
      />
      <Embers count={16} />

      <Reveal className="relative z-10 mx-auto max-w-md">
        <div className="font-serif text-xl leading-relaxed text-[#fbe9c0]">
          {c.intro.map((l: any) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <KolamDivider className="mx-auto mt-8 w-56 text-[#d4af37]" />
      </Reveal>

      <Reveal className="relative z-10 mt-14">
        <h2 className="font-display text-2xl tracking-[0.3em] uppercase sm:text-3xl">
          {c.celebrationsTitle}
        </h2>
      </Reveal>

      <div className="relative z-10 mx-auto mt-12 grid max-w-3xl gap-12 md:grid-cols-2">
        {invitation.events.map((_, i) => (
          <EventCard key={i} i={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- 3. COUNTDOWN ---------- */
function CountdownSection() {
  const { c } = useLang();
  return (
    <section className="bg-parchment px-5 py-20 text-center">
      <Reveal>
        <h2 className="mb-8 font-display text-lg tracking-[0.25em] text-[#5c0a16] uppercase sm:text-2xl">
          {c.countdownTitle}
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <Countdown />
      </Reveal>
    </section>
  );
}

/* ---------- 4. VENUE: golden gate in an arch ---------- */
function Venue() {
  const { c } = useLang();
  return (
    <section className="bg-temple px-6 py-20 text-center text-[#fff3d0]">
      <Reveal>
        <div className="relative mx-auto aspect-[3/4] w-[min(80vw,340px)] overflow-hidden rounded-t-[999px] rounded-b-xl border-4 border-[#d4af37] shadow-[0_0_70px_rgba(255,179,0,.28)] outline outline-1 outline-offset-8 outline-[#d4af37]/50">
          <ParallaxBg
            src={invitation.images.gate}
            position="50% 40%"
            strength={6}
            overlay="linear-gradient(180deg, transparent 55%, rgba(60,6,16,.55) 100%)"
          />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h2 className="mt-12 font-display text-xl tracking-[0.3em] text-[#f7d77a] uppercase">
          {c.venueLabel}
        </h2>
        <div className="mt-4 font-serif text-2xl font-semibold text-[#ffe9a8]">
          {c.venueLines.map((l: any) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </Reveal>

      <Reveal
        delay={0.3}
        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href={invitation.venue.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-gradient-to-b from-[#d4af37] to-[#a8802a] px-7 py-3 font-display text-xs tracking-widest text-[#3d0610] uppercase"
        >
          {c.openMaps}
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href={invitation.venue.directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#d4af37] px-7 py-3 font-display text-xs tracking-widest text-[#f3d995] uppercase"
        >
          {c.directions}
        </motion.a>
      </Reveal>
    </section>
  );
}

/* ---------- 5. SAVE THE DATE ---------- */
function SaveTheDate() {
  const { c } = useLang();
  return (
    <section className="bg-parchment px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-script text-5xl leading-[1.3] text-[#8b0f20]">
          {c.saveTitle}
        </h2>
        <p className="mx-auto mb-8 mt-2 max-w-xs font-serif text-lg text-[#4a3a2c]">
          {c.saveSub}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <Actions />
      </Reveal>
    </section>
  );
}

/* ---------- 6. FOOTER: back to the sunset ---------- */
function Footer() {
  const { c } = useLang();
  return (
    <footer className="relative overflow-hidden px-6 pb-16 pt-24 text-center text-[#fff3d0]">
      <ParallaxBg
        src={invitation.images.hero}
        position="50% 60%"
        overlay="linear-gradient(180deg, rgba(36,5,12,.95) 0%, rgba(36,5,12,.7) 50%, rgba(36,5,12,.95) 100%)"
      />
      <Embers count={18} />
      <Reveal className="relative z-10">
        <div className="mb-6 flex items-end justify-center gap-6">
          <Diya className="w-14" />
          <p className="font-display text-2xl text-[#f7d77a]">{c.thanks}</p>
          <Diya className="w-14" />
        </div>
        <p className="mx-auto max-w-sm font-serif text-xl italic text-[#fbe9c0]">
          {c.closing}
        </p>
        <KolamDivider className="mx-auto my-6 w-52 text-[#d4af37]" />
        <p className="font-serif text-sm">{c.signoff}</p>
        <p className="gold-text px-2 font-script text-4xl leading-[1.3]">
          {c.groom} &amp; {c.bride}
        </p>
        <p className="font-serif text-sm italic">{c.families}</p>
      </Reveal>
    </footer>
  );
}

export default function Letter() {
  return (
    <main className="relative z-10 w-full overflow-x-hidden">
      <Hero />
      <Celebrations />
      <CountdownSection />
      <Venue />
      <SaveTheDate />
      <Footer />
    </main>
  );
}
