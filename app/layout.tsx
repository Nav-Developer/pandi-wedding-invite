import type { Metadata } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Cinzel,
  Noto_Sans_Tamil,
  Noto_Serif_Tamil,
  Kavivanar,
} from "next/font/google";
import "./globals.css";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});
const serif = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});
const display = Cinzel({ subsets: ["latin"], variable: "--font-display" });

// Tamil fonts, used when the guest switches to தமிழ்
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil" });
const tamilSerif = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil-serif",
});
const tamilScript = Kavivanar({
  weight: "400",
  subsets: ["tamil"],
  variable: "--font-tamil-script",
});

export const metadata: Metadata = {
  title: "Pandi Krishnaa & Shanmuga Priya | Wedding Invitation",
  description: "Engagement 19 Nov 2026 · Wedding 20 Nov 2026 · Veerapandi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${script.variable} ${serif.variable} ${display.variable} ${tamil.variable} ${tamilSerif.variable} ${tamilScript.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
