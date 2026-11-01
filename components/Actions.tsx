"use client";

import { motion } from "framer-motion";
import { invitation } from "@/data/invitation";
import { useLang } from "./LangProvider";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-xs tracking-widest uppercase sm:text-sm";
const solid = `${base} bg-gradient-to-b from-[#d4af37] to-[#a8802a] text-[#3d0610] shadow-md`;
const maroon = `${base} bg-gradient-to-b from-[#a3132a] to-[#6e0a18] text-[#f3d9a0] shadow-md`;
const outline = `${base} border border-[#8b0f20] text-[#8b0f20]`;

const INVITE_IMG = "/images/invitation.png";
// const MAP_URL = "https://maps.app.goo.gl/z5JS7F3qjaNvqSDh6";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Arulmigu+Maariyamman+Temple+XC7P%2BW48+Virapandi+Tamil+Nadu";

export default function Actions() {
  const { c } = useLang();
  const names = `${c.groom} & ${c.bride}`;
  const where = c.venueLines.join(", ");
  const tap = { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 } };

  const googleCal = (i: number) => {
    const ev = invitation.events[i];
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${c.events[i].title} - ${names}`,
    )}&dates=${ev.startUTC}/${ev.endUTC}&location=${encodeURIComponent(where)}`;
  };

  const downloadIcs = () => {
    const stamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+/, "");
    const body = invitation.events
      .map((ev, i) =>
        [
          "BEGIN:VEVENT",
          `UID:wedding-${i}-${ev.startUTC}@invite`,
          `DTSTAMP:${stamp}`,
          `DTSTART:${ev.startUTC}`,
          `DTEND:${ev.endUTC}`,
          `SUMMARY:${c.events[i].title} - ${names}`,
          `LOCATION:${where}`,
          "END:VEVENT",
        ].join("\r\n"),
      )
      .join("\r\n");
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//wedding-invite//EN\r\n${body}\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-invitation.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: names, text: c.shareText, url });
      } catch {}
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${c.shareText} ${url}`)}`,
        "_blank",
      );
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <motion.a
        {...tap}
        href={INVITE_IMG}
        download="wedding-invitation.png"
        className={solid}
      >
        {(c as any).download ?? "⬇ Download Invitation"}
      </motion.a>
      <motion.a
        {...tap}
        href={MAP_URL}
        target="_blank"
        rel="noreferrer"
        className={maroon}
      >
        {(c as any).directions ?? "📍 Get Directions"}
      </motion.a>
      <div className="grid grid-cols-2 gap-3">
        {c.events.map((e: any, i: any) => (
          <motion.a
            key={i}
            {...tap}
            href={googleCal(i)}
            target="_blank"
            rel="noreferrer"
            className={outline}
          >
            📅 {e.title}
          </motion.a>
        ))}
      </div>
      <motion.button {...tap} onClick={downloadIcs} className={outline}>
        {c.addIcs}
      </motion.button>
      <motion.button {...tap} onClick={share} className={outline}>
        {c.share}
      </motion.button>
    </div>
  );
}
