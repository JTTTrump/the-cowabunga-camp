# Handoff: The Cowabunga Camp — Marketing Site

## Overview
A photo-driven marketing site for **The Cowabunga Camp**, a Highland-cow experience brand operating across eleven partner farms in the US. The flagship product is the **Shaggy Cow Lounge** — a sixty-minute session sitting in a straw pen with the herd. This bundle covers two screens: the **Homepage** and the **Shaggy Cow Lounge** experience/detail page. The design deliberately mirrors the selling discipline of a premium hospitality site (Under Canvas): condensed navigation, long-form photo-led scroll, and tinted background modules used sparingly to spotlight inventory/browsing sections without breaking scroll momentum.

## About the Design Files
The files in `prototypes/` are **design references authored in HTML** — prototypes that show the intended look and behavior. They are **not** production code to ship as-is. They use an internal component runtime (`support.js`, `.dc.html` custom-element wrapper) purely so they render in a browser for review.

**The task is to recreate these designs in a real, deployable codebase.** Since the goal is Vercel deployment and there is no existing codebase, **Next.js (App Router) + React is the recommended target** — it is the first-class Vercel framework and maps cleanly onto these two page-level components. Tailwind CSS or CSS Modules are both fine; all values below are given as exact literals so either works. Do not port `support.js` or the `.dc.html` wrapper — rebuild the markup as ordinary React components.

The two prototype pages open directly in a browser (`prototypes/Cowabunga Home.dc.html`, `prototypes/Shaggy Cow Lounge.dc.html`) for visual reference.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, layout, and interactions are all specified. Recreate the UI pixel-accurately using the exact hex values, font sizes, and measurements in this document. The one thing that is *not* final is imagery — every image is a placeholder slot (see **Assets**).

---

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Rust (primary) | `#B4512F` | Primary buttons, accent headings, links, active states, map pins |
| Ink (green-black) | `#1C2925` | Body text, dark sections, outline-button borders |
| White | `#FFFFFF` | Homepage base background |
| Sand / cream | `#F1E8D5` | Tinted modules (Reviews), Shaggy Cow Lounge page base background, light text on dark |
| Cream light | `#FAF6EC` | Card fills, hero right panel (Lounge page) |
| Module green | `#DDE8D9` | Offer box + newsletter box fill (Homepage) |
| Module green border | `#C2D4BD` | Border of the two green modules |
| Sage | `#A9C6A5` | Accent text/borders on dark (green-black) sections, tile CTA text |
| Footer green (home) | `#24382F` | Homepage footer background |
| Footer green (lounge) | `#16211D` | Lounge page footer background |
| Border light | `#D9E2D6` | Header border, review-card borders |
| Border sage | `#C9D6C4` | Dropdowns, card grids, section dividers |
| Hover green | `#F0F5EE` | Nav dropdown row hover, FAQ row hover |
| Text muted 1 | `#4A5A52` | Body paragraphs |
| Text muted 2 | `#6B7C73` | Secondary/caption text |
| Text muted 3 | `#8A9C91` | Placeholder input text, chevrons |
| Footer heading | `#95AE9E` / `#7E9186` | Footer column labels (home / lounge) |
| Footer link | `#C3D4C7` / `#B7C7BC` | Footer body text (home / lounge) |
| Map land | `#F0EBE2` | US map state fill |
| Map inner border | `#DAD2C6` | State-to-state borders |
| Map outer border | `#B3A896` | National outline |

**Gradients (image overlays):** vertical `linear-gradient(180deg, rgba(22,33,29,0) X%, rgba(22,33,29, .76–.78) 100%)` over photo tiles to seat white text at the bottom. Hero uses a three-stop version starting at `rgba(22,33,29,0.18)`.

### Typography
- **Newsreader** (serif, Google Fonts) — all headlines, section titles, the wordmark, stat numbers, review quotes. Weights 400–700.
- **DM Sans** (Google Fonts) — all body copy, nav, UI, buttons, labels. Weights 400–700.
- Fallbacks: `'Newsreader', Georgia, serif` and `'DM Sans', Helvetica, sans-serif`.
- Google Fonts link: `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400&display=swap`

**Type scale in use (px):** headline hero 56 (Lounge) / 38 (Home hero); section display 40–42; sub-headers 30; card titles 22–27; body 15–19; labels/eyebrows 11–12.5 uppercase with `letter-spacing:0.14–0.2em`. Eyebrows are rust, uppercase, 600 weight.

### Spacing & layout
- Section vertical padding: **88px** (Lounge sections), **40px** (Home sections); horizontal **40px** gutters.
- Content max-widths: `1280px` (wide sections), `1180px` (map/reviews), `1120px` (offer), `1000px` (newsletter), `900px` (FAQ).
- Standard grid gap: 20–24px between cards; 32–72px between two-column halves.

### Buttons (three variants, all rectangular — **no border-radius**)
1. **Primary:** `background:#B4512F; color:#FFF; font-weight:600;` padding varies 10–16px vertical / 15–32px horizontal by prominence.
2. **Outline (dark):** `border:1.5px solid #1C2925; color:#1C2925; font-weight:600;` transparent fill.
3. **Outline (sage, on dark sections):** `border:1.5px solid #A9C6A5; color:#A9C6A5;`.

### Other
- **Border radius:** 0 everywhere except circles (logo badge, nav dots, map pin hit-areas, step markers, "know before you go" icon circles). This square-edge treatment is intentional and central to the brand.
- **Shadows:** used only on dropdowns and the badged pricing card — `0 20px 38px -24px rgba(28,41,37,0.42)` and `0 18px 40px -24px rgba(28,41,37,0.45)`.

---

## Screen 1: Homepage
File: `prototypes/Cowabunga Home.dc.html`

### Layout (top to bottom, single column, white background)
1. **Sticky header chrome** (see Interactions for scroll behavior)
   - **Utility row** (hidden on scroll): right-aligned, 12px text — `FAQ · Gift Cards · Shop · Journal · Contact · ⌕ Search`, gap 26px, padding `8px 40px`, bottom border `#D9E2D6`.
   - **Main header row:** `[logo badge + wordmark] [nav — flex:1, space-evenly] [Become a Partner Farm (outline)] [Book Now (primary)]`. Padding `16px 24px` (condenses to `9px`).
     - Logo: circular image slot 38px (shrinks to 28px), wordmark "The Cowabunga Camp" in Newsreader 17px/700 (shrinks to 14.5px).
     - Nav items: `Locations, Stays, Experiences, Events, About` — 13.5px/500, hover color `#B4512F`.
2. **Hero** — 620px tall, full-bleed image slot with dark bottom gradient. Bottom-left stack: H1 "Come sit with the herd." (Newsreader 38px/700 white, text-shadow), eyebrow "THE SHAGGY COW LOUNGE" (12.5px, letter-spacing 0.2em, color `#F1E8D5`), primary CTA "Check Availability". Padding `0 56px 56px`.
3. **Offer module** — max-width 1120px, `#DDE8D9` fill, border `#C2D4BD`, grid `300px 1fr`. Left: 300×300 image slot. Right (padding `36px 44px`): eyebrow "CURRENT OFFER", H2 "Lunch's on us." (Newsreader 30px/700 **rust**), body paragraph, primary CTA "Book With Lunch" + "*Terms and conditions apply" (italic 12.5px).
4. **Our Farms** — centered header: display "Our farms" (Newsreader 42px/700 rust) + sub "Eleven farms. One very good afternoon." (20px/500). Horizontal scroll **rail** of farm cards (each `300px` wide × `380px` tall, gap 22px, scrollbar hidden), gradient overlay, city+state label bottom-left in Newsreader 22px/700 white. Below: centered **dot pagination** (15px circles; active = filled rust, inactive = transparent with `#B5C7B0` border) + outline CTA "View All Locations".
5. **Lounging, upgraded** — centered header (display rust + sub). 3-column grid of 460px-tall photo tiles with bottom gradient; each has Newsreader 27px title, note (14.5px `#DCE7DC`), and sage CTA text `{cta} →`. Content: Private Farm Tours / Glamping Yurts / Events & Buyouts.
6. **Find your farm** — centered header + "Hover a farmhouse to see where it is." Then the **US farm map** (see Screen 3 / component).
7. **Reviews** — `#F1E8D5` (sand) background, padding `30px 40px`, max-width 1180px, grid `1fr 1fr`. Left: H2 "The reviews don't stop coming in." (Newsreader 22px rust) + two white review cards (border `#D9E2D6`, padding `14px 18px`): quote in Newsreader 14.5px/700, footer row with attribution (11.5px muted) and five rust stars ★★★★★; then primary CTA "See All Reviews". Right: image slot, placeholder **"Kids and adults interacting with the cows on the farm"**.
8. **Newsletter** — max-width 1000px, `#DDE8D9` module, grid `1.1fr 1fr`, padding `44px 48px`. Left: H2 "Get the herd in your inbox." + supporting line. Right: email field (bordered `1.5px #1C2925`, no radius) butted against primary "Sign Up" button; consent line with privacy-policy link.
9. **Footer** — `#24382F`, text `#C3D4C7`, padding `60px 40px 32px`. 4-column grid `1.7fr 1fr 1fr 1fr`: brand column (wordmark, blurb, sage outline "Become a Partner Farm", social IG/FB/TT/YT) + CONNECT / HELPFUL LINKS / BOOK columns. Bottom bar: "© 2026 The Cowabunga Camp" and Terms / Privacy / Accessibility.

### Interactions & Behavior
- **Sticky condensing header:** on `window.scrollY > 60`, hide the utility row, swap logo/wordmark to the smaller variant, and reduce header vertical padding from 16px to 9px. State is a single `scrolled` boolean toggled on a passive scroll listener. Header stays `position:sticky; top:0; z-index:40`.
- **Nav dropdowns (hover-driven):**
  - `Locations` opens a **two-stage** flyout: a left panel of regions (EAST, MIDWEST, MOUNTAIN WEST, SOUTHWEST, WEST) and, adjacent to it, a right panel listing the farms (city + state) of the currently-hovered region. Hovering a region row swaps the right panel; active row gets `#F0F5EE` fill + rust text + `inset 3px 0 0 #B4512F` left bar. Panels: 250px wide, min-height 300px, white, border `#C9D6C4`, drop shadow.
  - `Stays / Experiences / Events / About` each open a **single** vertical panel of links (250px, same styling), rows hover to `#F0F5EE` + rust.
  - Menu opens on `mouseenter` of the item; the entire header wrapper closes it on `mouseleave` (sets active menu to null).
- **Farms carousel:** dot pagination scrolls the rail by `clientWidth − 80px` per page; number of dots is computed from `scrollWidth` (recomputed on resize and ~600ms after mount to account for images loading). `scroll-behavior:smooth`.
- Hover: nav items → rust; dropdown rows → hover-green; all buttons are static (add subtle darken on hover in production, not specified).

### State (Homepage)
- `menu` — which nav dropdown is open (`null | 'locations' | 'stays' | 'experiences' | 'events' | 'about'`).
- `region` — active region in the Locations flyout (default `'EAST'`).
- `page` / `pages` — carousel pagination index and computed page count.
- `scrolled` — boolean for header condensing.

### Data (Homepage)
- **Regions → farms** (drives the Locations flyout):
  - EAST: Asheville NC, Jacksonville FL, Nashville TN, Ocala FL
  - MIDWEST: Ann Arbor MI, Madison WI
  - MOUNTAIN WEST: Bozeman MT, Fort Collins CO
  - SOUTHWEST: Fredericksburg TX, Scottsdale AZ
  - WEST: Sonoma CA
- **Farm carousel** = all 11 farms **alphabetical by city**: Ann Arbor MI, Asheville NC, Bozeman MT, Fort Collins CO, Fredericksburg TX, Jacksonville FL, Madison WI, Nashville TN, Ocala FL, Scottsdale AZ, Sonoma CA.
- **Simple-nav panels:** Stays → Glamping Yurts / VIP Cabana / Farm Stays / Gift a Stay. Experiences → Shaggy Cow Lounge / Private Farm Tours / Bottle Feeding / Events & Buyouts. Events → Weddings / Corporate Retreats / Birthdays & Parties / Full Farm Buyout. About → Our Story / The Herd / Press / Journal.
- **Reviews** (⚠ placeholder copy — replace with real quotes): "A cow fell asleep in my lap. We both cried." / "The animals enjoyed it as much as we did."

---

## Screen 2: Shaggy Cow Lounge (experience detail)
File: `prototypes/Shaggy Cow Lounge.dc.html`. Base background `#F1E8D5` (sand).

### Layout (top to bottom)
1. **Utility bar** — `#1C2925` fill, `#F1E8D5` text, space-between: left "Now booking September dates · 11 partner farms" (sage), right `FAQ · Gift Cards · Shop · Journal · Contact`.
2. **Header** — sand background, grid `auto 1fr auto`: wordmark (Newsreader 21px/700), centered nav (`Experiences` active with rust underline, `Stay / Farms / The Herd / About`), then outline + primary buttons.
3. **Hero** — grid `1.05fr 1fr`. Left: 560px image slot. Right (`#FAF6EC`, padding `72px 64px`): eyebrow, H1 "Come sit with the herd." (Newsreader 56px/700), lead paragraph (19px), primary "Book Your Herd Time" + fine print.
4. **Sticky jump-nav** — `#1C2925` bar, `top:0 z-index:20`, in-page anchor links (What it is / Your hour / Pick your pasture / The herd / Know before you go / Questions) + a "Book Now" primary at right. Links hover to `#2C3B35` bg + sage text.
5. **What it is** (`#what`) — grid `1fr 1fr`: left copy (eyebrow, H2 40px, two paragraphs), right a 2×3 **fact grid** (hairline `#C9D6C4` gaps): 60 min / 12 guests / 11 farms / Year round / Free under-5s / 48 hrs cancellation. Each fact = Newsreader 26px rust value + uppercase caption.
6. **Your hour** (`#hour`) — `#FAF6EC`, bordered top+bottom. Header + a **5-step timeline** across a row: each step has a rust node dot on a top border line, a time (0:00–0:55), title, and body. Steps: Check in → Into the pen → Brushes out → The lean → Wash up and out.
7. **Pick your pasture** (`#tiers`) — centered header + 3 pricing cards. The **badged** card (default "Lounge + Feed") has a 2px rust border, "MOST BOOKED" rust tag, and a primary CTA; the other two are standard (`#FAF6EC`, `#C9D6C4` border, outline CTA). Each card: name (Newsreader 27px), meta line, pitch, checklist of includes (rust ✓ + text), CTA. Footnote about add-ons below.
8. **The herd** (`#herd`) — **dark section** `#1C2925`, sage eyebrow. Header + sage outline "See the Full Herd". 4-column grid of cow cards: square image slot, Newsreader 21px name, trait line. Cows: Marge, Biscuit, Tater, Winnie.
9. **Know before you go** (`#know`) — `#FAF6EC`, centered header. 4-column (2 rows) grid of 8 info tiles, each with a circular rust-outline icon, title, and body. Topics: Rain or shine / Closed-toe shoes / Free parking / Step-free access / Restrooms / No dogs / Under-5s free / 48-hour cancellation.
10. **Gallery** — full-bleed 4-column row of square image slots, no gaps.
11. **FAQ** (`#faq`) — max-width 900px, accordion. Each row: `#FAF6EC`, `#C9D6C4` border; header grid `1fr 24px` with question (17px/600) and a rust +/− sign; expanding body (16px). 6 Q&As included in the file.
12. **Closing** — dark `#1C2925`, grid `1fr 1fr`: left 440px image slot, right copy (eyebrow, H2 "Moo-ve on it." 44px, paragraph, primary "Book Your Herd Time" + sage outline "Give It as a Gift").
13. **Footer** — `#16211D`, same 4-column structure as home (EXPERIENCES / VISIT / MORE columns).

### Interactions & Behavior
- **FAQ accordion:** click a row to toggle; only one open at a time (`open` = index, `-1` = all closed). Sign flips `+` ↔ `−`. Default open index `0`.
- **Jump nav:** standard in-page `#anchor` links; `html { scroll-behavior:smooth }`. Bar is sticky at top.
- Hover states: jump-nav links, FAQ rows (→ hover-green), nav (rust underline on active).

### State (Lounge page)
- `open` — index of the expanded FAQ item.

### Tweakable props (design-time config baked into the prototype — implement as component props or config)
- `showPrices` (boolean, default **false**): when true, prepends the price to each tier's meta line. Prices in the data: General Admission **$29.50/person**, Lounge + Feed **$54/person**, VIP Cabana **from $450/group**.
- `badgedTier` (enum: General Admission / Lounge + Feed / VIP Cabana, default **Lounge + Feed**): which pricing card gets the "MOST BOOKED" badge + emphasized styling.

### Content
All body copy, the 6 FAQ answers, the 5 timeline steps, the 3 tiers with their include-lists, the 4 cow bios, and the 8 "know before you go" tiles are final and present verbatim in the prototype file — copy them exactly.

---

## Screen 3 / shared component: US Farm Map
File: `prototypes/farm-map.js` (custom element `<farm-map>`), used in the Homepage "Find your farm" section.

### Behavior & rendering
- Renders a US states map from **us-atlas** TopoJSON (`https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json`), projected with **d3 `geoAlbersUsa`** fit to a 1000×600 viewBox (16px inset).
- State fills `#F0EBE2`; interior borders `#DAD2C6` (0.9 stroke); national outline `#B3A896` (1.4 stroke).
- **11 farm pins** rendered as small SVG **barns** (gambrel roof, body, hay-loft window, cross-braced double door) in rust `#B4512F`, drawn at a 1.5× size multiplier, placed by projecting each farm's `[lon, lat]`.
- **Hover:** the barn scales to `1.22` and lifts 2px; a tooltip (`#1C2925` fill, sand text, city in sage) appears above the pin. 24px transparent circle as hit-target.
- Farm coordinates are in the file (real lat/lon for all 11 cities).

### Reimplementation notes
- In React, either keep this as a client-only component (dynamic import, `ssr:false` in Next.js) using d3 + topojson-client, **or** rebuild with `react-simple-maps` / `visx`. If keeping d3, load `d3@7.9.0` and `topojson-client@3.1.0`; the us-atlas JSON is fetched at runtime (consider vendoring it locally for reliability). The tooltip is a positioned `<div>` overlay scaled to the rendered SVG width.

---

## Assets
**Every image in both screens is a placeholder drop-zone** (the `<image-slot>` element), not a real asset — the client must supply photography. Each slot's `placeholder` text describes the intended shot. Key slots:
- Home: hero (wide lounge-pen footage — intended as **video**, currently a still slot), offer (farm lunch board), 11 farm cards, 3 "lounging upgraded" tiles, reviews photo (**"Kids and adults interacting with the cows on the farm"**).
- Lounge: hero (guest + Highland cow in straw), 4 cow portraits (Marge/Biscuit/Tater/Winnie), 4-up gallery, closing dusk shot.
- Logo: circular badge slot in the header — **client to supply real logo file**. Wordmark currently set in Newsreader; confirm the brand's actual wordmark typeface.

No icon library is used — the few glyphs are Unicode characters (☂ 👟 🅿 ♿ 🚻 🐕 👶 ↩ ✓ ★ ⌕). Swap for a real icon set (e.g. Lucide) in production. Fonts are Google Fonts (Newsreader, DM Sans).

## Still-open items (flagged by the design team)
- Real review quotes (homepage currently uses placeholder copy).
- Real logo file + confirmation of the wordmark typeface.
- Real photography for all image slots; hero is intended to be video.
- Farm list city/state is treated as real in the prototype — confirm the final 11 partner farms and their coordinates before launch.

## Files in this bundle
- `prototypes/Cowabunga Home.dc.html` — homepage reference (open in a browser)
- `prototypes/Shaggy Cow Lounge.dc.html` — Shaggy Cow Lounge page reference
- `prototypes/farm-map.js` — `<farm-map>` custom element (d3 + topojson)
- `prototypes/image-slot.js` — the placeholder image drop-zone element (reference only; replace with real `<img>`/`next/image`)
- `prototypes/support.js` — the prototype runtime (reference only; **do not port**)

> To view a prototype: open the `.html` file in a browser. The `.dc.html` wrapper and `support.js` exist only to render these references — production work should rebuild the markup as React components in your Next.js app.
