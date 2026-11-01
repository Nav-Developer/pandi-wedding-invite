export const invitation = {
  blessing: "With the Blessings of the Divine",
  tamilBlessing: "ஸ்ரீ கணேசாய நமஹ",
  tamilHeading: "திருமண அழைப்பிதழ்",
  // Background photos live in /public/images. Replace with HD versions using the same file names.
  images: {
    hero: "/images/seat.jpeg",
    lamps: "/images/lamp-hall.jpg",
    gate: "/images/inside-temple.jpeg",
  },
  tagline: [
    "Two hearts, one beautiful journey,",
    "and a lifetime of togetherness begins here…",
  ],
  groom: "Pandi Krishnaa",
  bride: "Shanmuga Priya",
  intro: [
    "With joyful hearts and the blessings of our families,",
    "we cordially invite you to be a part of our celebrations",
  ],
  events: [
    {
      title: "Engagement Ceremony",
      tamilTitle: "நிச்சயதார்த்தம்",
      day: "19",
      month: "November",
      year: "2026",
      weekday: "Thursday",
      tamilWeekday: "வியாழக்கிழமை",
      time: "6.00 - 7.30 PM",
      note: null as string | null,
      // UTC times for the calendar buttons (IST = UTC + 5:30)
      startUTC: "20261119T123000Z",
      endUTC: "20261119T140000Z",
    },
    {
      title: "Wedding Ceremony",
      tamilTitle: "திருமணம்",
      day: "20",
      month: "November",
      year: "2026",
      weekday: "Friday",
      tamilWeekday: "வெள்ளிக்கிழமை",
      time: "6.00 - 7.00 AM",
      note: "We request the pleasure of your presence and blessings as they unite in marriage.",
      startUTC: "20261120T003000Z",
      endUTC: "20261120T013000Z",
    },
  ],
  // Wedding muhurtham used by the countdown
  countdownTarget: "2026-11-20T06:00:00+05:30",
  venue: {
    lines: ["Sri Gowmariyamman Temple", "Marriage Hall,", "Veerapandi"],
    // mapUrl: "https://maps.google.com/?q=Sri+Gowmariyamman+Temple+Veerapandi",
    // directionsUrl:
    //   "https://www.google.com/maps/dir/?api=1&destination=Sri+Gowmariyamman+Temple+Veerapandi",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=9.963294,77.440865",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=9.963294,77.440865",
  },
  // TODO: put the family WhatsApp number here: country code + number, no + or spaces
  rsvpPhone: "919999999999",
  closing:
    "Your presence and blessings will make our special moments even more memorable.",
  signoff: "With love,",
  families: "and our families",
};
