"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import EnvelopeIntro from "./EnvelopeIntro";
import Letter from "./Letter";
import Petals from "./Petals";
import LanguageToggle from "./LanguageToggle";
import { LangProvider, useLang } from "./LangProvider";
import VideoIntro from "./VideoIntro";

type Stage = "video" | "envelope" | "letter";

const INTRO_VIDEO: string | null = "/video/INTRO.mp4";

function CoupleBadge() {
  return (
    <div
      className="pointer-events-none fixed z-[100] overflow-hidden rounded-full border-[3px] border-[#d9a85a] shadow-xl"
      style={{
        width: "clamp(130px, 15vw, 190px)",
        height: "clamp(130px, 15vw, 190px)",
        right: "3vw", // tweak these two to sit on the watermark
        bottom: "11vh",
        background: "#fff4d6",
      }}
    >
      <Image
        src="/images/couple.png"
        alt="Couple"
        fill
        sizes="190px"
        className="object-cover object-top"
      />
    </div>
  );
}

function Inner() {
  const { lang } = useLang();
  const [stage, setStage] = useState<Stage>(INTRO_VIDEO ? "video" : "envelope");

  return (
    <div
      data-lang={lang}
      className="relative min-h-dvh"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #fff4d6 0%, #f3d9a0 60%, #d9a85a 100%)",
      }}
    >
      {stage !== "video" && <LanguageToggle />}

      <AnimatePresence mode="wait">
        {stage === "video" && INTRO_VIDEO && (
          <VideoIntro
            key="video"
            src={INTRO_VIDEO}
            poster="/images/temple.png"
            maxSeconds={10}
            onFinish={() => setStage("envelope")}
          />
        )}
        {stage === "envelope" && (
          <EnvelopeIntro key="envelope" onOpened={() => setStage("letter")} />
        )}
      </AnimatePresence>

      {stage === "letter" && (
        <>
          <Petals />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Letter />
          </motion.div>
        </>
      )}

      {stage === "video" && <CoupleBadge />}
    </div>
  );
}

export default function Invitation() {
  return (
    <LangProvider>
      <Inner />
    </LangProvider>
  );
}
