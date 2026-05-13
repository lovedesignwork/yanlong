/**
 * Single source of truth for all editorial copy & data.
 * Sourced from https://yanlongphuket.com.
 * Replace Unsplash URLs with real /public/images/* paths once photography lands.
 */

export const HOUSE = {
  brand: { en: "YAN LONG PHUKET" },
  tagline: "Food Well Told",
  positioning: "Authentic Cantonese & The Best Peking Duck",
  award: "★ Best Peking Duck in Thailand",
  phone: "061-172-9697",
  line: "@yanlong",
  address: {
    line1: "154, Royal Phuket City Hotel · 1st Floor",
    line2: "Phangnga Road, Mueang Phuket District",
  },
  hours: {
    daily: "Daily · 11:00 — 22:00",
    lastOrder: "Last order at 9:30 PM",
  },
  signatureDish: "Peking Duck",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/atelier", label: "Food Well Told" },
  { href: "/rooms", label: "Dining Rooms" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Editorial stats — grounded in real Yan Long brand positioning.
 */
export const STATS = [
  { n: "★", label: "Best Peking Duck in Thailand" },
  { n: "25", suffix: "+", label: "Years of culinary heritage" },
  { n: "1", suffix: "ˢᵗ", label: "Floor · Royal Phuket City Hotel" },
  { n: "7", label: "Days a week · Open daily" },
] as const;

export type Plate = {
  no: string;
  type: string;
  title: string;
  description: string;
  priceTHB: number;
  region: string;
  image: string;
  badge?: string;
};

/**
 * Signature plates. Peking Duck leads — Yan Long's stated signature
 * ("Renowned for serving the Best Peking Duck in Thailand").
 * Other plates represent the six regional traditions on the menu.
 */
export const SIGNATURE_PLATES: Plate[] = [
  {
    no: "№ 01",
    type: "Signature",
    title: "Peking Duck",
    description:
      "Brined and air-dried for two days, then roasted to perfection — crispy skin, tender meat. The dish that earned us Best Peking Duck in Thailand.",
    priceTHB: 1300,
    region: "Northern",
    image: "/images/YL2_DUCK_dark_moody_resize.jpg",
    badge: "★ Best in Thailand",
  },
  {
    no: "№ 02",
    type: "Cantonese",
    title: "Hand-folded Dim Sum Selection",
    description:
      "A curated selection of hand-folded dim sum — har gow, siu mai, and seasonal specialties. Steamed to order each morning by our dim sum master.",
    priceTHB: 450,
    region: "Cantonese",
    image: "/images/YL2_DONGPO_dark_moody_resize.jpg",
  },
  {
    no: "№ 03",
    type: "Cantonese",
    title: "Honey BBQ Pork",
    description:
      "Char siu roasted with honey glaze until caramelized and glossy. Sweet, savory, with charred edges — a Cantonese barbecue classic.",
    priceTHB: 600,
    region: "Cantonese",
    image: "/images/YL2_CHARSIU_dark_moody_resize.jpg",
  },
  {
    no: "№ 04",
    type: "Hong Kong",
    title: "Barbecued Suckling Pig",
    description:
      "Whole suckling pig roasted until the skin crackles. Pre-order 1-3 days in advance. A centerpiece for celebrations and family gatherings.",
    priceTHB: 3800,
    region: "Hong Kong",
    image: "/images/YL2_PIG_dark_moody_resize.jpg",
  },
  {
    no: "№ 05",
    type: "Cantonese",
    title: "Deep Fried Grouper Fish",
    description:
      "Whole grouper fish deep fried until golden and crispy, served with sweet and sour sauce. A classic Cantonese preparation with bold, tangy flavors.",
    priceTHB: 680,
    region: "Cantonese",
    image: "/images/YL2_SSFISH_dark_moody_resize.jpg",
  },
  {
    no: "№ 06",
    type: "Yan Long",
    title: "Crispy Pork Belly",
    description:
      "Yan Long style — roasted until the skin shatters like glass, the fat renders, and the meat stays juicy. Our house specialty.",
    priceTHB: 600,
    region: "Cantonese",
    image: "/images/YL2_SIUYUK_dark_moody_resize.jpg",
  },
];

export type Room = {
  name: string;
  capacity: string;
  description: string;
  image: string;
};

/**
 * Three private dining categories — from the original yanlongphuket.com:
 * "Private Dining Room", "Special Ceremony", and "Chinese Theme Restaurant".
 */
export const ROOMS: Room[] = [
  {
    name: "Main Dining Hall",
    capacity: "Main Dining · Family & Friends",
    description:
      "The principal room — a warm, refined space where families and friends gather to enjoy the authentic Chinese restaurant ambiance of Yan Long. Round tables, lazy-susan service, the unhurried rhythm of a long meal.",
    image: "/images/MD04_mother_serving_main_H.jpg",
  },
  {
    name: "Private Dining Room",
    capacity: "Private Dining · Intimate",
    description:
      "A curtained room for small celebrations, business dinners and intimate gatherings at the authentic Chinese restaurant in Phuket. Booked forty-eight hours in advance.",
    image: "/images/WD04_gala_full_silk_room_H.jpg",
  },
  {
    name: "Celebration Hall",
    capacity: "Special Ceremony · Weddings & Events",
    description:
      "Celebrate your wedding, milestone birthday, or family reunion in our ceremonial hall. Multi-course service, tea ceremony on request, house-made longevity buns.",
    image: "/images/TEST3_family_silk_room_horizontal.jpg",
  },
];

/**
 * Three culinary inheritances — universal kitchen craft language,
 * accessible to any reader.
 */
export const PILLARS = [
  { en: "Wok Hei", sub: "The breath of the wok · 800°C" },
  { en: "The Hand", sub: "Folded by morning, every morning" },
  { en: "Patience", sub: "Brined and aged in hours, not minutes" },
] as const;

export const RESERVATION_ROWS = [
  { k: "Concierge", v: `${HOUSE.phone} · LINE ${HOUSE.line}` },
  {
    k: "Address",
    v: `${HOUSE.address.line1}\n${HOUSE.address.line2}`,
  },
  { k: "Hours", v: `${HOUSE.hours.daily}\n${HOUSE.hours.lastOrder}` },
  { k: "Dress", v: "Smart casual · No shorts at dinner" },
  { k: "Parking", v: "Direct floor parking access\nEasy mobility support for elderly guests" },
] as const;
