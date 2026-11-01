"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  /** Put your video in /public and use its path, e.g. /intro.mp4 */
  src?: string;
  /** Optional image shown while the video loads, e.g. /images/gopuram-sunset.jpg */
  poster?: string;
  /** The intro is cut after this many seconds, even if the video is longer. */
  maxSeconds?: number;
  onFinish: () => void;
};

export default function VideoIntro({
  src = "/video/INTRO.mp4",
  poster,
  maxSeconds = 10,
  onFinish,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finished = useRef(false);
  const onFinishRef = useRef(onFinish);
  const capTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    if (capTimer.current) clearTimeout(capTimer.current);
    videoRef.current?.pause();
    onFinishRef.current();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Browsers only allow autoplay when muted. If even that fails, show a "tap to play" button.
    v.play().catch(() => setNeedsTap(true));
    const skip = setTimeout(() => setShowSkip(true), 1200);
    return () => {
      clearTimeout(skip);
      if (capTimer.current) clearTimeout(capTimer.current);
    };
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const tapToPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.play()
      .then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex h-dvh items-center justify-center bg-black"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlaying={() => {
          // start the 10 second cap only once the video is really playing
          if (!capTimer.current)
            capTimer.current = setTimeout(finish, maxSeconds * 1000);
        }}
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime >= maxSeconds) finish();
        }}
        onEnded={finish}
        onError={finish} // video missing or broken: go straight to the envelope
      />

      {/* soft dark edges so the buttons stay readable on any video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.35) 0%, transparent 20%, transparent 75%, rgba(0,0,0,.45) 100%)",
        }}
      />

      {needsTap && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={tapToPlay}
          className="absolute rounded-full border border-[#d4af37] bg-black/50 px-8 py-4 font-display text-sm tracking-[0.3em] text-[#f7d77a] uppercase backdrop-blur"
        >
          ▶ Tap to play
        </motion.button>
      )}

      {!needsTap && (
        <button
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          className="absolute left-4 top-4 rounded-full border border-white/40 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur"
        >
          {muted ? "🔇 Sound on" : "🔊 Mute"}
        </button>
      )}

      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={finish}
          className="absolute bottom-6 right-4 rounded-full border border-white/40 bg-black/40 px-5 py-2 font-display text-xs tracking-[0.25em] text-white uppercase backdrop-blur"
        >
          Skip ›
        </motion.button>
      )}
    </motion.div>
  );
}
