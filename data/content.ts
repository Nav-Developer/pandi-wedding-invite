export type Lang = "en" | "ta";

/* ---------- all the words, in both languages ---------- */
type EventText = {
  title: string;
  weekday: string;
  month: string;
  time: string;
  note: string | null;
};

export type Content = {
  blessingTop: string;
  blessing: string;
  heading: string;
  groom: string;
  bride: string;
  tagline: string[];
  scroll: string;
  intro: string[];
  events: EventText[];
  celebrationsTitle: string;
  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  today: string;
  venueLabel: string;
  venueLines: string[];
  openMaps: string;
  directions: string;
  saveTitle: string;
  saveSub: string;
  rsvp: string;
  addIcs: string;
  share: string;
  rsvpMessage: string;
  shareText: string;
  thanks: string;
  closing: string;
  signoff: string;
  families: string;
  envelopeTitle: string;
  envelopeHint: string;
  envelopeNames: string;
};

export const content: Record<Lang, Content> = {
  en: {
    blessingTop: "Sri Ganeshaya Namaha",
    blessing: "With the Blessings of the Divine",
    heading: "Wedding Invitation",
    groom: "Pandi Krishnaa",
    bride: "Shanmuga Priya",
    tagline: [
      "Two hearts, one beautiful journey,",
      "and a lifetime of togetherness begins here…",
    ],
    scroll: "Scroll ↓",
    intro: [
      "With joyful hearts and the blessings of our families,",
      "we cordially invite you to be a part of our celebrations",
    ],
    events: [
      {
        title: "Engagement Ceremony",
        weekday: "Thursday",
        month: "November",
        time: "6.00 - 7.30 PM",
        note: null,
      },
      {
        title: "Wedding Ceremony",
        weekday: "Friday",
        month: "November",
        time: "6.00 - 7.00 AM",
        note: "We request the pleasure of your presence and blessings as they unite in marriage.",
      },
    ],
    celebrationsTitle: "Celebrations",
    countdownTitle: "Counting down to the muhurtham",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    today: "Today is the auspicious day 🙏",
    venueLabel: "Venue",
    venueLines: ["Sri Gowmariyamman Temple", "Marriage Hall,", "Veerapandi"],
    openMaps: "📍 Open in Maps",
    directions: "Get Directions",
    saveTitle: "Save the Date",
    saveSub:
      "Let us know you are coming and add the celebrations to your calendar.",
    rsvp: "💬 RSVP on WhatsApp",
    addIcs: "⬇ Add both to calendar (.ics)",
    share: "↗ Share this invitation",
    rsvpMessage:
      "Vanakkam! We will be attending the wedding of Pandi Krishnaa & Shanmuga Priya. 🙏",
    shareText:
      "You are invited to the wedding of Pandi Krishnaa & Shanmuga Priya on 20 November 2026.",
    thanks: "Thank you",
    closing:
      "Your presence and blessings will make our special moments even more memorable.",
    signoff: "With love,",
    families: "and our families",
    envelopeTitle: "You are invited",
    envelopeHint: "Tap the seal to open",
    envelopeNames: "Krishnaa & Priya",
  },
  ta: {
    blessingTop: "ஸ்ரீ கணேசாய நமஹ",
    blessing: "இறைவனின் திருவருளால்",
    heading: "திருமண அழைப்பிதழ்",
    groom: "பாண்டி கிருஷ்ணா",
    bride: "சண்முகப் பிரியா",
    tagline: [
      "இரு உள்ளங்கள், ஒரு அழகிய பயணம்,",
      "வாழ்நாள் முழுவதும் இணைந்திருக்கும் பந்தம் இங்கே தொடங்குகிறது…",
    ],
    scroll: "கீழே செல்லவும் ↓",
    intro: [
      "எங்கள் குடும்பத்தினரின் ஆசியுடனும் மகிழ்ச்சியுடனும்,",
      "எங்கள் திருமண விழாக்களில் கலந்துகொள்ள உங்களை அன்புடன் அழைக்கிறோம்",
    ],
    events: [
      {
        title: "நிச்சயதார்த்தம்",
        weekday: "வியாழக்கிழமை",
        month: "நவம்பர்",
        time: "மாலை 6.00 - 7.30",
        note: null,
      },
      {
        title: "திருமணம்",
        weekday: "வெள்ளிக்கிழமை",
        month: "நவம்பர்",
        time: "காலை 6.00 - 7.00",
        note: "மணமக்கள் திருமண பந்தத்தில் இணையும் இந்நன்னாளில் தங்கள் வருகையையும் ஆசிகளையும் அன்புடன் வேண்டுகிறோம்.",
      },
    ],
    celebrationsTitle: "சுப நிகழ்வுகள்",
    countdownTitle: "திருமண முகூர்த்தத்திற்கு இன்னும்",
    days: "நாட்கள்",
    hours: "மணி",
    minutes: "நிமிடங்கள்",
    seconds: "விநாடிகள்",
    today: "இன்று திருமண நன்னாள் 🙏",
    venueLabel: "இடம்",
    venueLines: ["ஸ்ரீ கௌமாரியம்மன் கோயில்", "திருமண மண்டபம்,", "வீரபாண்டி"],
    openMaps: "📍 வரைபடத்தில் காண",
    directions: "வழி காட்டு",
    saveTitle: "நாளைக் குறித்துக்கொள்ளுங்கள்",
    saveSub:
      "தங்கள் வருகையை எங்களுக்குத் தெரிவித்து, நிகழ்வுகளை உங்கள் நாட்காட்டியில் சேர்த்துக்கொள்ளுங்கள்.",
    rsvp: "💬 வாட்ஸ்அப்பில் பதிலளிக்க",
    addIcs: "⬇ இரண்டையும் நாட்காட்டியில் சேர்க்க (.ics)",
    share: "↗ அழைப்பிதழைப் பகிர",
    rsvpMessage:
      "வணக்கம்! பாண்டி கிருஷ்ணா & சண்முகப் பிரியா திருமண விழாவில் நாங்கள் கலந்துகொள்கிறோம். 🙏",
    shareText:
      "பாண்டி கிருஷ்ணா & சண்முகப் பிரியா திருமண விழாவிற்கு உங்களை அன்புடன் அழைக்கிறோம் — 20 நவம்பர் 2026.",
    thanks: "நன்றி",
    closing:
      "தங்கள் வருகையும் ஆசிகளும் எங்கள் சிறப்பு தருணங்களை மேலும் மறக்க முடியாததாக்கும்.",
    signoff: "அன்புடன்,",
    families: "மற்றும் எங்கள் குடும்பத்தினர்",
    envelopeTitle: "உங்களுக்கான அழைப்பு",
    envelopeHint: "திறக்க முத்திரையைத் தொடவும்",
    envelopeNames: "கிருஷ்ணா & பிரியா",
  },
};
