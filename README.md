# Yan Long · Maison

> **Food Well Told** — an authentic Szechwan Chinese restaurant in Phuket Old Town.

Editorial marketing website for **Yan Long**, located on the first floor of the
prestigious **Royal Phuket City Hotel**. Renowned for serving the
**Best Peking Duck in Thailand**.

[yanlongphuket.com](https://yanlongphuket.com) · 061-172-9697 · LINE @yanlong

---

## Tech Stack

- **[Next.js 15.5](https://nextjs.org)** App Router + React 19
- **TypeScript** strict mode
- **[Tailwind CSS v4](https://tailwindcss.com)** with `@theme` design tokens
- **Cormorant Garamond** + **Inter** (Google Fonts)
- **[Resend](https://resend.com)** for transactional email (reservations + contact)
- **[react-phone-number-input](https://www.npmjs.com/package/react-phone-number-input)** for the country-code phone selector
- **[lucide-react](https://lucide.dev)** for chevron icons in the calendar
- Custom calendar picker built per internal Notion spec — no third-party calendar library

---

## Pages

| Route | Purpose |
|---|---|
| `/` | The House — hero, cover story, signature plates, atelier, rooms, reserve panel |
| `/menu` | Six signature plates from six regional Chinese traditions |
| `/atelier` | The kitchen — bold flavors, authentic recipes |
| `/rooms` | Three private dining rooms |
| `/reserve` | Reservation form with custom Maison-styled calendar picker |
| `/contact` | General contact form (private functions, weddings, press, partnerships) |

---

## Forms

Both forms are **server-action powered** (Next.js 15 App Router) and email
to `yanlong@royalphuketcity.com` and `marketing@royalphuketcity.com` simultaneously.

### Reservation form (`/reserve`)
- Custom Maison-styled calendar picker (sharp corners, aubergine selected, gold today-ring)
- Continuous time picker 11:00 — 20:00 (every 30 minutes, last order at 8:00 PM)
- Country flag + dial code phone selector (defaults to 🇹🇭 +66)
- Room preference, occasion, special requests
- Phone submitted in E.164 format (`+66895551234`)

### Contact form (`/contact`)
- Inquiry type dropdown: General · Private Function · Wedding · Corporate ·
  Press · Partnership · Feedback · Other
- Same phone selector + country
- Free-form message (10-character minimum)
- Both inboxes receive every submission with one-tap **Reply** and **Call**
  buttons in the email itself

---

## Setup

```bash
npm install
cp .env.example .env.local
# Add your Resend API key (free at resend.com — 3,000 emails/month)
npm run dev
```

Server runs on **[http://localhost:3001](http://localhost:3001)** (custom port,
not the Next.js default 3000).

### Environment variables

```bash
RESEND_API_KEY=re_your_key_here
RESERVATION_TO=yanlong@royalphuketcity.com,marketing@royalphuketcity.com
RESERVATION_FROM="Yan Long Reservations <onboarding@resend.dev>"
# Optional: separate inbox for contact form (defaults to RESERVATION_TO)
# CONTACT_TO=
# Optional: BCC backup
# RESERVATION_BCC=
```

> **Dev fallback:** without a `RESEND_API_KEY` set, every form submission logs
> the full email to the dev terminal so you can test the entire pipeline before
> signing up.

---

## Design system

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#f5efe3` | Page background — light cream |
| `--paper-2` | `#ede5d2` | Alternating section background |
| `--ink` | `#211c1a` | Primary text · footer background |
| `--ink-soft` | `#4c4440` | Secondary text |
| `--mute` | `#8a8278` | Labels, captions |
| `--aubergine` | `#5b1e5a` | **Primary brand** — buttons, emphasis, selected states |
| `--gold` | `#aa8c30` | **Secondary** — kickers, prices, today-ring, badges |
| `--line` | `rgba(33,28,26,0.15)` | All hairline borders |
| `--font-sans` | Inter | Body, UI, labels, buttons |
| `--font-serif` | Cormorant Garamond | Display headlines, italics, pull-quotes |

**No rounded corners. No drop shadows on cards.** Sharp editorial corners
throughout, hairline borders for definition, subtle ink shadows only on
floating popovers.

---

## Project structure

```
app/
  layout.tsx              # Root layout: Nav + Footer + fonts
  page.tsx                # Home
  globals.css             # Tailwind v4 + design tokens + responsive scaling
  menu/page.tsx
  atelier/page.tsx
  rooms/page.tsx
  reserve/page.tsx        # Booking form page
  contact/page.tsx        # Contact form page
  actions/
    reserve.ts            # Server action: validate → email → success
    contact.ts            # Server action: validate → email → success
components/
  Nav.tsx                 # Logo (left) · menu (center) · Reserve (right)
  Footer.tsx
  Hero.tsx · Stats.tsx · Feature.tsx · Collection.tsx
  Atelier.tsx · Rooms.tsx · Reserve.tsx
  BookingForm.tsx         # Reservation form
  ContactForm.tsx         # Contact form
  CalendarPicker.tsx      # Custom Maison-styled calendar picker
  CountryPhoneSelector.tsx # Flag + dial code phone input
lib/
  content.ts              # Single source of truth: HOUSE, plates, rooms, nav
  email.ts                # Resend transport with dev console fallback
  reservation-template.ts # HTML + plain-text reservation email
  contact-template.ts     # HTML + plain-text contact email
public/
  yan-long-logo.png       # Brand wordmark used in nav
```

---

## Photography

The current build uses **Unsplash placeholders** for all imagery (hero, dish
cards, chef, rooms). To swap in real Yan Long photography:

1. Drop photos into `/public/images/` (e.g. `peking-duck.jpg`)
2. Update the URLs in `lib/content.ts` (`SIGNATURE_PLATES[*].image`,
   `ROOMS[*].image`)
3. Update the cover-story photo in `components/Feature.tsx`
4. Update the hero photo in `components/Hero.tsx`

---

## Scripts

```bash
npm run dev      # Dev server on port 3001
npm run build    # Production build
npm run start    # Production server on port 3001
npm run lint     # Next.js ESLint
```

---

## Deploy

Designed to deploy to **[Vercel](https://vercel.com)** with zero config.

```bash
vercel
```

Set the same environment variables in the Vercel dashboard. The free
hobby tier handles this site comfortably.

---

## License

Private · proprietary to Yan Long Maison · Royal Phuket City Hotel.

© 2026 Yan Long Phuket — Food Well Told.
