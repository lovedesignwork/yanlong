/**
 * Single source of truth for all editorial copy & data.
 * Sourced from https://yanlongphuket.com.
 * Replace Unsplash URLs with real /public/images/* paths once photography lands.
 */

export const HOUSE = {
  brand: { en: "YAN LONG PHUKET" },
  tagline: "Food Well Told",
  positioning: "Authentic Szechwan · South-Western China",
  award: "★ Best Peking Duck in Thailand",
  phone: "061-172-9697",
  line: "@yanlong",
  address: {
    line1: "154, Royal Phuket City Hotel · 1st Floor",
    line2: "Phangnga Road, Mueang Phuket District",
  },
  hours: {
    daily: "Daily · 11:00 — 20:00",
    lastOrder: "Last order at 8:00 PM",
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
  { n: "6", label: "Regions of Chinese tradition" },
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
    title: "Peking Duck, House Specialty",
    description:
      "Brined and air-dried for two days, then roasted to perfection — crispy skin, tender meat. The dish that earned us Best Peking Duck in Thailand.",
    priceTHB: 1980,
    region: "Northern",
    image: "/images/YL2_DUCK_dark_moody_resize.jpg",
    badge: "★ Best in Thailand",
  },
  {
    no: "№ 02",
    type: "Szechwan",
    title: "Mapo Tofu, House Style",
    description:
      "Silken tofu in a fiery sauce of fermented broad bean, Szechwan peppercorn and minced pork. Bold, numbing, unmistakably South-Western.",
    priceTHB: 380,
    region: "Szechwan",
    image: "/images/YL2_DONGPO_dark_moody_resize.jpg",
  },
  {
    no: "№ 03",
    type: "Cantonese",
    title: "Dim Sum Basket",
    description:
      "Four baskets, four fillings — har gow, siu mai, pork bun, chive dumpling. Steamed to order, served with chrysanthemum tea.",
    priceTHB: 680,
    region: "Cantonese",
    image: "/images/YL2_CHARSIU_dark_moody_resize.jpg",
  },
  {
    no: "№ 04",
    type: "Shanghai",
    title: "Xiaolongbao",
    description:
      "Eighteen folds of thin wheat skin around a pork-and-ginger broth. Steamed six minutes, served instantly with fine ginger threads.",
    priceTHB: 320,
    region: "Shanghai",
    image: "/images/YL2_PIG_dark_moody_resize.jpg",
  },
  {
    no: "№ 05",
    type: "Wok",
    title: "Hand-Pulled Chow Mein",
    description:
      "Hand-pulled noodles fired in a carbon-steel wok with pork shoulder, scallion and dark soy. The breath of the wok at 800°C.",
    priceTHB: 460,
    region: "Cantonese",
    image: "/images/YL2_SSFISH_dark_moody_resize.jpg",
  },
  {
    no: "№ 06",
    type: "Rice",
    title: "Yangzhou Fried Rice",
    description:
      "Jasmine rice, lap cheong, shrimp, preserved vegetable, scallion. A classic of the Jiangsu kitchen, finished over open flame.",
    priceTHB: 380,
    region: "Jiangsu",
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
] as const;
