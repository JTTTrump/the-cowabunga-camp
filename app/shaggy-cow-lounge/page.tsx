"use client";

import { useState } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";

const NEWSREADER = "var(--font-newsreader), Georgia, serif";

/* ---- design-time config (prototype "tweakable props") ---- */
const SHOW_PRICES = false; // prepend price to each tier's meta line
const BADGED_TIER = "Lounge + Feed"; // which card carries the MOST BOOKED badge

/* ------------------------------ data ------------------------------ */

const ANCHORS = [
  { label: "What it is", href: "#what" },
  { label: "Your hour", href: "#hour" },
  { label: "Pick your pasture", href: "#tiers" },
  { label: "The herd", href: "#herd" },
  { label: "Know before you go", href: "#know" },
  { label: "Questions", href: "#faq" },
];

const FACTS = [
  { v: "60 min", k: "Standard session" },
  { v: "12", k: "Guests, maximum" },
  { v: "11", k: "Partner farms" },
  { v: "Year round", k: "Weather permitting" },
  { v: "Free", k: "Under 5s" },
  { v: "48 hrs", k: "Free cancellation" },
];

const STEPS = [
  {
    time: "0:00",
    title: "Check in at the barn",
    body: "Meet your host, leave bags in a locker and get the two-minute version of how to greet a cow.",
  },
  {
    time: "0:10",
    title: "Into the pen",
    body: "Shoes off the path, into the straw. The herd is already there. You sit; they investigate.",
  },
  {
    time: "0:20",
    title: "Brushes out",
    body: "Grooming is how a Highland cow decides it likes you. Pick a comb, pick a cow, get to work.",
  },
  {
    time: "0:40",
    title: "The lean",
    body: "Somewhere around here a cow will put her full weight against you and close her eyes. This is the part people tell their friends about.",
  },
  {
    time: "0:55",
    title: "Wash up and out",
    body: "Sinks by the gate, hair everywhere, farm store on your way to the car.",
  },
];

const TIER_DATA = [
  {
    name: "General Admission",
    meta: "60 minutes · up to 12 guests",
    price: "$29.50 per person",
    pitch:
      "The herd, the straw and an hour to yourself. The way most people meet a Highland cow for the first time.",
    includes: [
      "60 minutes inside the lounge pen",
      "Brushes and grooming combs provided",
      "Photos encouraged, no time limit on them",
      "Covered seating and shade",
    ],
    cta: "Book General Admission",
  },
  {
    name: "Lounge + Feed",
    meta: "90 minutes · up to 12 guests",
    price: "$54 per person",
    pitch:
      "The same hour, plus the part everyone actually came for: a feed bucket in your lap and a cow deciding you're worth walking over for.",
    includes: [
      "Everything in General Admission",
      "90 minutes instead of 60",
      "A feed bucket per guest",
      "Bottle feeding when calves are on milk",
      "Reserved seating at the rail",
      "A host with you the whole session",
    ],
    cta: "Book Lounge + Feed",
  },
  {
    name: "VIP Cabana",
    meta: "All day · up to 8 guests",
    price: "From $450 per group",
    pitch:
      "A private cabana at the edge of the pasture, yours from open to close. Come and go, eat, nap, and have the herd brought to you.",
    includes: [
      "Everything in Lounge + Feed",
      "Private cabana for the full day",
      "Unlimited re-entry to the lounge",
      "A dedicated host for your group",
      "Farm board and drinks on arrival",
      "First pick of session times",
    ],
    cta: "Book a Cabana",
  },
];

const HERD = [
  { name: "Marge", trait: "Fourteen years old, entirely in charge, will lean until you fall over.", ph: "Portrait — Marge" },
  { name: "Biscuit", trait: "The friendliest of the bunch. Comes to the gate before you do.", ph: "Portrait — Biscuit" },
  { name: "Tater", trait: "Two years old and still learning that people are not for licking. Losing that battle.", ph: "Portrait — Tater" },
  { name: "Winnie", trait: "Shy for the first ten minutes, glued to you for the last forty.", ph: "Portrait — Winnie" },
];

const KNOWS = [
  { icon: "☂", title: "Rain or shine", body: "The lounge is covered. Only lightning stops us." },
  { icon: "👟", title: "Closed-toe shoes", body: "Required. Straw, mud and hooves." },
  { icon: "🅿", title: "Free parking", body: "On site at every partner farm." },
  { icon: "♿", title: "Step-free access", body: "Nine of eleven farms. Ask us which." },
  { icon: "🚻", title: "Restrooms", body: "At the barn, thirty seconds from the pen." },
  { icon: "🐕", title: "No dogs", body: "Not in the lounge. Shaded parking available." },
  { icon: "👶", title: "Under 5s free", body: "Kids under 12 need an adult beside them." },
  { icon: "↩", title: "48-hour cancellation", body: "Full refund, no questions." },
];

const FAQS = [
  {
    q: "Do the cows actually want us there?",
    a: "They opt in. The lounge gate stays open to the pasture and cows wander in when they feel like company — which, after a few years of being brushed by strangers, is most of the time. If a cow leaves mid-session, another usually takes her spot.",
  },
  {
    q: "Is this safe for kids?",
    a: "Yes, and under-5s come free. Highland cows are famously gentle, and a host stays in the pen for every session. That said, they are large animals, so children under 12 need an adult sitting with them.",
  },
  {
    q: "What should I wear?",
    a: "Closed-toe shoes you don't love, and clothes you don't mind wearing cow hair home in. There is straw, there is mud in spring, and there is a non-zero chance of being licked.",
  },
  {
    q: "What happens if it rains?",
    a: "The lounge is covered, so sessions run in almost any weather. We only cancel for lightning or high wind, and if we do you get a full refund or a free rebook, your choice.",
  },
  {
    q: "Can I bring my dog?",
    a: "Not into the lounge. The herd is relaxed about people and much less relaxed about dogs. There is shaded parking and water at every partner farm if you need to leave one in the car briefly.",
  },
  {
    q: "Can I book the whole thing for a group?",
    a: "Yes. Anything over twelve guests, or any private event, goes through Events & Buyouts rather than the standard booking — we will match you to the farm with the right space.",
  },
];

/* ------------------------------ page ------------------------------ */

export default function ShaggyCowLounge() {
  const [open, setOpen] = useState(0);

  return (
    <div
      style={{
        fontFamily: "var(--font-dm-sans), Helvetica, sans-serif",
        color: "#1C2925",
        background: "#F1E8D5",
      }}
    >
      {/* ============================ UTILITY BAR ============================ */}
      <div
        style={{
          background: "#1C2925",
          color: "#F1E8D5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 40px",
          fontSize: 12.5,
        }}
      >
        <span style={{ letterSpacing: "0.08em", color: "#A9C6A5" }}>
          Now booking September dates · 11 partner farms
        </span>
        <div style={{ display: "flex", gap: 22 }}>
          <span>FAQ</span>
          <span>Gift Cards</span>
          <span>Shop</span>
          <span>Journal</span>
          <span>Contact</span>
        </div>
      </div>

      {/* ============================== HEADER ============================== */}
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 32,
          alignItems: "center",
          padding: "18px 40px",
          background: "#F1E8D5",
          borderBottom: "1px solid #C9D6C4",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: NEWSREADER,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "#1C2925",
          }}
        >
          The Cowabunga Camp
        </Link>
        <nav
          style={{
            display: "flex",
            gap: 26,
            justifyContent: "center",
            fontSize: 14.5,
            fontWeight: 500,
          }}
        >
          <span style={{ borderBottom: "2px solid #B4512F", paddingBottom: 2 }}>
            Experiences
          </span>
          <span>Stay</span>
          <span>Farms</span>
          <span>The Herd</span>
          <span>About</span>
        </nav>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            className="btn btn-outline-dark tap"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 16px",
              border: "1.5px solid #1C2925",
            }}
          >
            Become a Partner Farm
          </span>
          <span
            className="btn btn-primary tap"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: "12px 22px",
              background: "#B4512F",
              color: "#FFF",
            }}
          >
            Book Now
          </span>
        </div>
      </header>

      {/* =============================== HERO =============================== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          alignItems: "stretch",
        }}
      >
        <div style={{ position: "relative", height: 560, minWidth: 0 }}>
          <ImageSlot placeholder="Hero — a guest sitting in the straw with a Highland cow leaning in. Landscape, warm light." />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 26,
            padding: "72px 64px",
            background: "#FAF6EC",
            minWidth: 0,
          }}
        >
          <div style={eyebrow}>The Shaggy Cow Lounge</div>
          <h1
            style={{
              fontFamily: NEWSREADER,
              fontSize: 56,
              lineHeight: 1.05,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Come sit with the herd.
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "#4A5A52",
              margin: 0,
              maxWidth: "40ch",
              textWrap: "pretty",
            }}
          >
            An hour in the straw with a thousand pounds of very relaxed Highland
            cow. No fence between you. No rush. Just you, the herd, and a whole
            lot of hair.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              className="btn btn-primary tap"
              style={{
                fontSize: 16,
                fontWeight: 600,
                padding: "16px 32px",
                background: "#B4512F",
                color: "#FFF",
              }}
            >
              Book Your Herd Time
            </span>
            <span style={{ fontSize: 14, color: "#6B7C73" }}>
              Under 5s free · Book 2 weeks ahead in peak season
            </span>
          </div>
        </div>
      </section>

      {/* ============================= JUMP NAV ============================= */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "#1C2925",
          color: "#F1E8D5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <div style={{ display: "flex" }}>
          {ANCHORS.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="jump-link"
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                padding: "16px 20px",
                color: "#F1E8D5",
                letterSpacing: "0.02em",
              }}
            >
              {a.label}
            </a>
          ))}
        </div>
        <span
          className="btn btn-primary tap"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            padding: "9px 20px",
            background: "#B4512F",
            color: "#FFF",
          }}
        >
          Book Now
        </span>
      </div>

      {/* ============================= WHAT IT IS ============================= */}
      <section id="what" style={{ padding: "88px 40px", background: "#F1E8D5" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={eyebrowWide}>What you&apos;re actually booking</div>
            <h2 style={sectionH2}>
              Sixty minutes. Twelve people. One very patient cow.
            </h2>
            <p style={bodyLg}>
              The Lounge is a covered, straw-floored pen where our Highland cows
              come to be brushed, scratched and admired. You sit on the ground
              with them. They lean on you. It is not a petting zoo and it is not a
              tour — it is closer to an hour in a very hairy living room.
            </p>
            <p style={bodyLg}>
              Sessions are capped at twelve so every guest gets real time with the
              herd rather than a spot in a queue. Cows join the lounge by choice,
              which is why they stay so calm — and why no two sessions are the
              same.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "#C9D6C4",
              border: "1px solid #C9D6C4",
            }}
          >
            {FACTS.map((f) => (
              <div
                key={f.k}
                style={{
                  background: "#FAF6EC",
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: NEWSREADER,
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#B4512F",
                  }}
                >
                  {f.v}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    color: "#6B7C73",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {f.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== YOUR HOUR ============================== */}
      <section
        id="hour"
        style={{
          padding: "88px 40px",
          background: "#FAF6EC",
          borderTop: "1px solid #C9D6C4",
          borderBottom: "1px solid #C9D6C4",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                maxWidth: "56ch",
              }}
            >
              <div style={eyebrowWide}>Your hour, minute by minute</div>
              <h2 style={sectionH2}>No surprises. Except the licking.</h2>
            </div>
            <span
              style={{
                fontSize: 15,
                color: "#6B7C73",
                textAlign: "right",
                lineHeight: 1.6,
                maxWidth: "30ch",
              }}
            >
              Arrive ten minutes early. Wear something you don&apos;t mind getting
              hair on.
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: 0,
            }}
          >
            {STEPS.map((s) => (
              <div
                key={s.time}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  paddingRight: 28,
                  borderTop: "2px solid #C9D6C4",
                  paddingTop: 20,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -9,
                    left: 0,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#B4512F",
                    border: "2px solid #FAF6EC",
                  }}
                />
                <div
                  style={{
                    fontSize: 12.5,
                    letterSpacing: "0.1em",
                    color: "#B4512F",
                    fontWeight: 600,
                  }}
                >
                  {s.time}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.25 }}>
                  {s.title}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "#4A5A52",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== TIERS =============================== */}
      <section id="tiers" style={{ padding: "88px 40px", background: "#F1E8D5" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={eyebrowWide}>Pick your pasture</div>
            <h2 style={{ ...sectionH2, maxWidth: "20ch" }}>
              Three ways to spend an afternoon.
            </h2>
            <p style={{ ...bodyMd, maxWidth: "56ch", textAlign: "center" }}>
              Every option puts you in the pen with the herd. What changes is how
              long you stay, how close you get, and how much of the farm is yours.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
              alignItems: "start",
            }}
          >
            {TIER_DATA.map((t) => {
              const badged = t.name === BADGED_TIER;
              const meta = SHOW_PRICES ? `${t.price} · ${t.meta}` : t.meta;
              return (
                <div key={t.name}>
                  <div
                    style={
                      badged
                        ? {
                            background: "#F4F8F1",
                            border: "2px solid #B4512F",
                            padding: "40px 28px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            boxShadow: "0 18px 40px -24px rgba(28,41,37,0.45)",
                          }
                        : {
                            background: "#FAF6EC",
                            border: "1px solid #C9D6C4",
                            padding: "32px 28px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                          }
                    }
                  >
                    {badged && (
                      <div
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.14em",
                          fontWeight: 600,
                          color: "#FFF",
                          background: "#B4512F",
                          padding: "6px 12px",
                          alignSelf: "flex-start",
                        }}
                      >
                        MOST BOOKED
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: NEWSREADER,
                          fontSize: 27,
                          fontWeight: 700,
                          lineHeight: 1.15,
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          fontSize: 14.5,
                          color: "#6B7C73",
                          fontWeight: 500,
                        }}
                      >
                        {meta}
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 15.5,
                        lineHeight: 1.6,
                        color: "#4A5A52",
                        margin: 0,
                        textWrap: "pretty",
                      }}
                    >
                      {t.pitch}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 11,
                        borderTop: "1px solid #DDE7DA",
                        paddingTop: 20,
                      }}
                    >
                      {t.includes.map((inc) => (
                        <div
                          key={inc}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "18px 1fr",
                            gap: 10,
                            alignItems: "start",
                          }}
                        >
                          <span
                            style={{
                              color: "#B4512F",
                              fontSize: 15,
                              lineHeight: 1.4,
                            }}
                          >
                            ✓
                          </span>
                          <span style={{ fontSize: 15, lineHeight: 1.45 }}>
                            {inc}
                          </span>
                        </div>
                      ))}
                    </div>
                    {badged ? (
                      <div
                        className="btn btn-primary tap"
                        style={{
                          fontSize: 15.5,
                          fontWeight: 600,
                          padding: 16,
                          background: "#B4512F",
                          color: "#FFF",
                          textAlign: "center",
                          marginTop: 4,
                        }}
                      >
                        {t.cta}
                      </div>
                    ) : (
                      <div
                        className="btn btn-outline-dark tap"
                        style={{
                          fontSize: 15.5,
                          fontWeight: 600,
                          padding: 15,
                          border: "1.5px solid #1C2925",
                          textAlign: "center",
                          marginTop: 4,
                        }}
                      >
                        {t.cta}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <p
              style={{
                fontSize: 14.5,
                color: "#6B7C73",
                textAlign: "center",
                maxWidth: "60ch",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Feed buckets, build-a-stuffy kits and the Sunday after-party are
              offered once your date is held — no need to decide now.
            </p>
          </div>
        </div>
      </section>

      {/* =============================== HERD =============================== */}
      <section
        id="herd"
        style={{ padding: "88px 40px", background: "#1C2925", color: "#F1E8D5" }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                maxWidth: "52ch",
              }}
            >
              <div style={{ ...eyebrowWide, color: "#A9C6A5" }}>Meet the herd</div>
              <h2 style={sectionH2}>They&apos;re the whole point.</h2>
            </div>
            <span
              className="btn btn-outline-sage tap"
              style={{
                fontSize: 15,
                fontWeight: 600,
                padding: "13px 24px",
                border: "1.5px solid #A9C6A5",
                color: "#A9C6A5",
              }}
            >
              See the Full Herd
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 20,
            }}
          >
            {HERD.map((c) => (
              <div
                key={c.name}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    minWidth: 0,
                  }}
                >
                  <ImageSlot placeholder={c.ph} />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{
                      fontFamily: NEWSREADER,
                      fontSize: 21,
                      fontWeight: 700,
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{ fontSize: 14, color: "#B7C7BC", lineHeight: 1.5 }}
                  >
                    {c.trait}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= KNOW BEFORE YOU GO ======================= */}
      <section id="know" style={{ padding: "88px 40px", background: "#FAF6EC" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={eyebrowWide}>Know before you go</div>
            <h2 style={sectionH2}>No bull, just the details.</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 1,
              background: "#C9D6C4",
              border: "1px solid #C9D6C4",
            }}
          >
            {KNOWS.map((k) => (
              <div
                key={k.title}
                style={{
                  background: "#FAF6EC",
                  padding: "30px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    border: "1.5px solid #B4512F",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    color: "#B4512F",
                  }}
                >
                  {k.icon}
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 600 }}>{k.title}</div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "#4A5A52",
                    textWrap: "pretty",
                  }}
                >
                  {k.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== GALLERY ============================== */}
      <section style={{ padding: 0, background: "#F1E8D5" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 0,
          }}
        >
          {[
            "Guest brushing a cow",
            "Two friends laughing in the straw",
            "Close-up of a Highland cow's face",
            "Wide shot of the lounge pen at golden hour",
          ].map((ph) => (
            <div
              key={ph}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                minWidth: 0,
              }}
            >
              <ImageSlot placeholder={ph} />
            </div>
          ))}
        </div>
      </section>

      {/* ================================ FAQ ================================ */}
      <section id="faq" style={{ padding: "88px 40px", background: "#F1E8D5" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={eyebrowWide}>Questions</div>
            <h2 style={sectionH2}>Udderly reasonable things to ask.</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  style={{ border: "1px solid #C9D6C4", background: "#FAF6EC" }}
                >
                  <button
                    type="button"
                    className="faq-head tap"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 24px",
                      gap: 16,
                      alignItems: "center",
                      padding: "20px 24px",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      font: "inherit",
                      color: "inherit",
                    }}
                  >
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{f.q}</span>
                    <span
                      style={{
                        fontSize: 20,
                        color: "#B4512F",
                        textAlign: "center",
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 22px",
                        fontSize: 16,
                        lineHeight: 1.65,
                        color: "#4A5A52",
                        maxWidth: "70ch",
                        textWrap: "pretty",
                      }}
                    >
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== CLOSING ============================== */}
      <section style={{ padding: 0, background: "#1C2925" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "stretch",
          }}
        >
          <div style={{ position: "relative", height: 440, minWidth: 0 }}>
            <ImageSlot placeholder="Closing image — herd at dusk, wide" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 24,
              padding: "80px 64px",
              color: "#F1E8D5",
              minWidth: 0,
            }}
          >
            <div style={{ ...eyebrowWide, color: "#A9C6A5" }}>
              Ready when you are
            </div>
            <h2
              style={{
                fontFamily: NEWSREADER,
                fontSize: 44,
                lineHeight: 1.1,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Moo-ve on it.
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "#B7C7BC",
                margin: 0,
                maxWidth: "38ch",
                textWrap: "pretty",
              }}
            >
              Weekend sessions fill about two weeks out, and the herd doesn&apos;t
              take walk-ins.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span
                className="btn btn-primary tap"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "16px 32px",
                  background: "#B4512F",
                  color: "#FFF",
                }}
              >
                Book Your Herd Time
              </span>
              <span
                className="btn btn-outline-sage tap"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "16px 32px",
                  border: "1.5px solid #A9C6A5",
                  color: "#A9C6A5",
                }}
              >
                Give It as a Gift
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =============================== FOOTER =============================== */}
      <footer
        style={{ background: "#16211D", color: "#B7C7BC", padding: "56px 40px 32px" }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Link
              href="/"
              style={{
                fontFamily: NEWSREADER,
                fontSize: 20,
                fontWeight: 700,
                color: "#F1E8D5",
              }}
            >
              The Cowabunga Camp
            </Link>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "34ch",
              }}
            >
              Highland cow experiences on eleven partner farms.
            </p>
            <span
              className="btn btn-outline-sage tap"
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: "11px 18px",
                border: "1.5px solid #A9C6A5",
                color: "#A9C6A5",
                alignSelf: "flex-start",
              }}
            >
              Become a Partner Farm
            </span>
          </div>
          <FooterCol
            heading="EXPERIENCES"
            items={["Shaggy Cow Lounge", "Private Farm Tours", "Bottle Feeding", "Events & Buyouts", "Glamping"]}
          />
          <FooterCol
            heading="VISIT"
            items={["Find a Farm", "The Herd", "FAQ", "Contact"]}
          />
          <FooterCol
            heading="MORE"
            items={["Gift Cards", "Shop", "Journal", "Press"]}
          />
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "36px auto 0",
            borderTop: "1px solid #26332E",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12.5,
            color: "#7E9186",
          }}
        >
          <span>© 2026 The Cowabunga Camp</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span>Terms</span>
            <span>Privacy</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --------------------------- helpers/styles --------------------------- */

function FooterCol({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14.5 }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "#7E9186",
          fontWeight: 600,
          marginBottom: 4,
        }}
      >
        {heading}
      </div>
      {items.map((it) => (
        <span key={it}>{it}</span>
      ))}
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#B4512F",
  fontWeight: 600,
};

const eyebrowWide: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#B4512F",
  fontWeight: 600,
};

const sectionH2: React.CSSProperties = {
  fontFamily: NEWSREADER,
  fontSize: 40,
  lineHeight: 1.15,
  fontWeight: 700,
  margin: 0,
};

const bodyLg: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.65,
  color: "#4A5A52",
  margin: 0,
  textWrap: "pretty",
};

const bodyMd: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.6,
  color: "#4A5A52",
  margin: 0,
  textWrap: "pretty",
};
