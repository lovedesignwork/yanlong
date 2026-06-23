/**
 * Central SEO / AEO (Answer Engine Optimization) configuration.
 *
 * One source of truth for canonical URLs, organization identity, and every
 * JSON-LD structured-data block the site emits. Structured data is the single
 * biggest lever for AI-search citation (ChatGPT, Gemini, Perplexity, AI
 * Overviews) and for the "Citable / Trustworthy" audit dimensions.
 */

import { HOUSE, SIGNATURE_PLATES } from "@/lib/content";

export const SITE_URL = "https://yanlongphuket.com";
export const SITE_NAME = "Yan Long Phuket";

/** Approximate coordinates — Royal Phuket City Hotel, Phang-Nga Road, Old Town. */
export const GEO = { latitude: 7.88406, longitude: 98.38876 } as const;

export const CONTACT = {
  telephone: "+66611729697",
  telephoneDisplay: HOUSE.phone,
  email: "yanlong@royalphuketcity.com",
  line: HOUSE.line,
  streetAddress: "154 Phang-Nga Road, 1st Floor, Royal Phuket City Hotel",
  addressLocality: "Talad Yai, Mueang Phuket District",
  addressRegion: "Phuket",
  postalCode: "83000",
  addressCountry: "TH",
} as const;

/** Build an absolute URL for a path. */
export function abs(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/* ------------------------------------------------------------------ */
/* Restaurant + LocalBusiness — the primary entity for AI engines.    */
/* ------------------------------------------------------------------ */

export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: SITE_NAME,
    alternateName: "Yan Long",
    description:
      "Yan Long is an authentic Cantonese Chinese restaurant on the first floor of the Royal Phuket City Hotel in Phuket Old Town, home of the Best Peking Duck in Thailand.",
    url: SITE_URL,
    telephone: CONTACT.telephone,
    email: CONTACT.email,
    image: [abs("/images/NEW/Peking Duck.jpg")],
    logo: abs("/faviconyanlong.png"),
    servesCuisine: ["Cantonese", "Chinese", "Dim Sum", "Peking Duck"],
    priceRange: "฿฿฿",
    currenciesAccepted: "THB",
    acceptsReservations: "True",
    award: "Best Peking Duck in Thailand",
    slogan: HOUSE.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    parentOrganization: {
      "@type": "Hotel",
      name: "Royal Phuket City Hotel",
      url: "https://royalphuketcity.com",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: abs("/reserve"),
        inLanguage: "en",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Table reservation" },
    },
    hasMenu: `${SITE_URL}/#menu`,
  };
}

/* ------------------------------------------------------------------ */
/* WebSite                                                            */
/* ------------------------------------------------------------------ */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#restaurant` },
  };
}

/* ------------------------------------------------------------------ */
/* Menu — the signature plates as a structured Menu                   */
/* ------------------------------------------------------------------ */

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/#menu`,
    name: "Yan Long Signature Menu",
    inLanguage: "en",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Signatures",
      hasMenuItem: SIGNATURE_PLATES.map((p) => ({
        "@type": "MenuItem",
        name: p.title,
        description: p.description,
        offers: {
          "@type": "Offer",
          price: p.priceTHB,
          priceCurrency: "THB",
        },
      })),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                        */
/* ------------------------------------------------------------------ */

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* FAQ — highest-impact block for AI citation. Answers 30-50 words,   */
/* self-contained and quotable (the ~18-token extraction rule).       */
/* ------------------------------------------------------------------ */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Where is Yan Long located?",
    a: "Yan Long is on the first floor of the Royal Phuket City Hotel, 154 Phang-Nga Road, Talad Yai, Mueang Phuket District, Phuket 83000, Thailand — in the heart of Phuket Old Town.",
  },
  {
    q: "What are Yan Long's opening hours?",
    a: "Yan Long is open daily from 11:00 to 22:00, with last orders at 21:30. The restaurant serves both lunch and dinner seven days a week, including weekends and public holidays.",
  },
  {
    q: "What type of cuisine does Yan Long serve?",
    a: "Yan Long serves authentic Cantonese Chinese cuisine, including hand-folded dim sum, barbecued meats and fresh seafood. Its signature dish is Peking Duck, recognised as the Best Peking Duck in Thailand.",
  },
  {
    q: "How do I make a reservation at Yan Long?",
    a: "Reserve a table online at yanlongphuket.com/reserve, call 061-172-9697, or message the restaurant on LINE @yanlong. Reservation requests are confirmed by the concierge within two hours.",
  },
  {
    q: "How much does Peking Duck cost at Yan Long?",
    a: "Peking Duck at Yan Long is 1,300 THB. It is brined and air-dried for two days, then roasted for crispy skin and tender meat — the dish that earned Best Peking Duck in Thailand.",
  },
  {
    q: "Does Yan Long have private dining rooms?",
    a: "Yes. Yan Long has three Boutique Rooms seating up to 10 guests each (minimum spend 7,500–9,000 THB) and one Grand Room seating up to 50 guests (minimum spend 30,000 THB).",
  },
  {
    q: "Is there parking at Yan Long?",
    a: "Yes. Yan Long offers direct floor parking access at the Royal Phuket City Hotel, with easy mobility support for elderly guests arriving by car.",
  },
  {
    q: "What is the dress code at Yan Long?",
    a: "The dress code at Yan Long is smart casual. Shorts are not permitted during dinner service. The setting suits both relaxed family meals and formal business hosting.",
  },
  {
    q: "Does Yan Long cater for events and celebrations?",
    a: "Yes. Yan Long's private rooms suit business hosting, family reunions and birthday celebrations. Barbecued suckling pig and whole roast dishes can be pre-ordered one to three days in advance.",
  },
];

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
