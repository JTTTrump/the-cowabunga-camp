# The Cowabunga Camp — Marketing Site

A photo-driven marketing site for **The Cowabunga Camp**, a Highland-cow
experience brand operating across eleven partner farms in the US. The flagship
product is the **Shaggy Cow Lounge** — sixty minutes in a straw pen with the
herd.

Built with **Next.js (App Router) + React + TypeScript**, recreated
pixel-accurately from the design handoff in [`HANDOFF.md`](./HANDOFF.md).

## Pages

| Route | Screen |
|---|---|
| `/` | Homepage — hero, current offer, farms carousel, "lounging upgraded", interactive US farm map, reviews, newsletter |
| `/shaggy-cow-lounge` | Shaggy Cow Lounge experience/detail page — split hero, sticky jump-nav, fact grid, hour-by-hour timeline, pricing tiers, the herd, know-before-you-go, gallery, FAQ accordion |

## Tech

- **Next.js 15** (App Router) — first-class Vercel framework
- **Newsreader** + **DM Sans** via `next/font/google`
- **d3-geo** + **topojson-client** for the `<FarmMap>` (US states from a
  vendored [us-atlas](https://github.com/topojson/us-atlas) TopoJSON in
  `public/us-states-10m.json`, 11 farmhouse pins with hover tooltips)
- No CSS framework — exact design tokens applied inline per the handoff spec,
  with a small `globals.css` for resets and hover/focus states

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
```

## Design system (from the handoff)

- **Colors:** Rust `#B4512F` (primary), Ink `#1C2925`, Sand `#F1E8D5`, Cream
  `#FAF6EC`, Module green `#DDE8D9`, Sage `#A9C6A5`
- **Type:** Newsreader (serif) for headlines/wordmark; DM Sans for body/UI
- **Square edges everywhere** (no border-radius) except circles — logo badge,
  map pins, step markers, "know before you go" icons. This is intentional and
  central to the brand.

## Placeholders / still-open items

Every image is a placeholder drop-zone (`components/ImageSlot.tsx`) describing
the intended shot — the client supplies photography (the homepage hero is
intended to be video). Review quotes and the logo are also placeholders. See
[`HANDOFF.md`](./HANDOFF.md) → "Still-open items".

## Project structure

```
app/
  layout.tsx                 root layout + fonts + metadata
  globals.css                resets, hover states, rail scrollbar hide
  page.tsx                   Homepage
  shaggy-cow-lounge/page.tsx Shaggy Cow Lounge page
components/
  ImageSlot.tsx              placeholder image drop-zone
  FarmMap.tsx                interactive US farm map (client)
public/
  us-states-10m.json         vendored us-atlas TopoJSON
prototypes/                  original design references (not shipped)
screenshots/                 design reference screenshots
HANDOFF.md                   the original design handoff spec
```
