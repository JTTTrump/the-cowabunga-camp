"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import FarmMap from "@/components/FarmMap";

/* ----------------------------- data ----------------------------- */

type Farm = { city: string; state: string };

const REGIONS: { name: string; farms: Farm[] }[] = [
  {
    name: "EAST",
    farms: [
      { city: "Asheville", state: "North Carolina" },
      { city: "Jacksonville", state: "Florida" },
      { city: "Nashville", state: "Tennessee" },
      { city: "Ocala", state: "Florida" },
    ],
  },
  {
    name: "MIDWEST",
    farms: [
      { city: "Ann Arbor", state: "Michigan" },
      { city: "Madison", state: "Wisconsin" },
    ],
  },
  {
    name: "MOUNTAIN WEST",
    farms: [
      { city: "Bozeman", state: "Montana" },
      { city: "Fort Collins", state: "Colorado" },
    ],
  },
  {
    name: "SOUTHWEST",
    farms: [
      { city: "Fredericksburg", state: "Texas" },
      { city: "Scottsdale", state: "Arizona" },
    ],
  },
  {
    name: "WEST",
    farms: [{ city: "Sonoma", state: "California" }],
  },
];

const PANELS: Record<string, string[]> = {
  stays: ["Glamping Yurts", "VIP Cabana", "Farm Stays", "Gift a Stay"],
  experiences: [
    "Shaggy Cow Lounge",
    "Private Farm Tours",
    "Bottle Feeding",
    "Events & Buyouts",
  ],
  events: [
    "Weddings",
    "Corporate Retreats",
    "Birthdays & Parties",
    "Full Farm Buyout",
  ],
  about: ["Our Story", "The Herd", "Press", "Journal"],
};

const NAV = ["Locations", "Stays", "Experiences", "Events", "About"];

/* alphabetical by city */
const FARM_LIST: Farm[] = [
  { city: "Ann Arbor", state: "Michigan" },
  { city: "Asheville", state: "North Carolina" },
  { city: "Bozeman", state: "Montana" },
  { city: "Fort Collins", state: "Colorado" },
  { city: "Fredericksburg", state: "Texas" },
  { city: "Jacksonville", state: "Florida" },
  { city: "Madison", state: "Wisconsin" },
  { city: "Nashville", state: "Tennessee" },
  { city: "Ocala", state: "Florida" },
  { city: "Scottsdale", state: "Arizona" },
  { city: "Sonoma", state: "California" },
];

const UPGRADES = [
  {
    name: "Private Farm Tours",
    note: "The whole property, your group only. Two hours, start to finish.",
    cta: "Explore",
    ph: "Guests walking the pasture with a host",
  },
  {
    name: "Glamping Yurts",
    note: "Stay the night. The herd is right there in the morning.",
    cta: "Discover",
    ph: "Yurt interior at dusk, farm visible outside",
  },
  {
    name: "Events & Buyouts",
    note: "Weddings, retreats and anything that needs the whole barn.",
    cta: "Enquire",
    ph: "Long table set up in the barn for an event",
  },
];

const REVIEWS = [
  { quote: "A cow fell asleep in my lap. We both cried.", who: "Placeholder — real review" },
  { quote: "The animals enjoyed it as much as we did.", who: "Placeholder — real review" },
];

const NEWSREADER = "var(--font-newsreader), Georgia, serif";
const LOUNGE = "/shaggy-cow-lounge";

/* ----------------------------- page ----------------------------- */

export default function Home() {
  const [menu, setMenu] = useState<string | null>(null);
  const [region, setRegion] = useState("EAST");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const stride = useCallback(() => {
    const el = railRef.current;
    return el ? Math.max(1, el.clientWidth - 80) : 1;
  }, []);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const next = Math.max(1, Math.ceil(maxScroll / stride()) + 1);
    setPages((p) => (p !== next ? next : p));
  }, [stride]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 60);
    };
    onScroll();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600); // slot images can shift rail width
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  const goPage = (i: number) => {
    const el = railRef.current;
    setPage(i);
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    el.scrollLeft = Math.min(i * stride(), maxScroll);
  };

  const activeRegion = REGIONS.find((r) => r.name === region) || REGIONS[0];
  const headerPad = scrolled ? "9px" : "16px";

  return (
    <div
      style={{
        fontFamily: "var(--font-dm-sans), Helvetica, sans-serif",
        color: "#1C2925",
        background: "#FFFFFF",
      }}
    >
      {/* ============================ STICKY CHROME ============================ */}
      <div
        onMouseLeave={() => setMenu(null)}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "#FFFFFF",
          borderBottom: "1px solid #D9E2D6",
        }}
      >
        {!scrolled && (
          <div
            style={{
              background: "#FFFFFF",
              color: "#1C2925",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 26,
              padding: "8px 40px",
              fontSize: 12,
              borderBottom: "1px solid #D9E2D6",
            }}
          >
            <span>FAQ</span>
            <span>Gift Cards</span>
            <span>Shop</span>
            <span>Journal</span>
            <span>Contact</span>
            <span style={{ cursor: "pointer" }}>⌕ Search</span>
          </div>
        )}

        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: `${headerPad} 24px`,
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: scrolled ? 9 : 10,
              flex: "0 0 auto",
              color: "#1C2925",
            }}
          >
            <div
              style={{
                width: scrolled ? 28 : 38,
                height: scrolled ? 28 : 38,
                flex: "0 0 auto",
                position: "relative",
              }}
            >
              <ImageSlot placeholder="Logo" shape="circle" />
            </div>
            <div
              style={{
                fontFamily: NEWSREADER,
                fontSize: scrolled ? 14.5 : 17,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              The Cowabunga Camp
            </div>
          </Link>

          <nav
            style={{
              display: "flex",
              flex: "1 1 auto",
              justifyContent: "space-evenly",
              alignItems: "center",
              fontSize: 13.5,
              fontWeight: 500,
              minWidth: "max-content",
            }}
          >
            {NAV.map((label) => {
              const key = label.toLowerCase();
              const isLocations = key === "locations";
              const openSimple = !isLocations && menu === key;
              const openRegions = isLocations && menu === "locations";
              return (
                <div
                  key={key}
                  className="home-nav-item"
                  onMouseEnter={() => setMenu(key)}
                  style={{
                    position: "relative",
                    padding: "10px 3px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>{label}</span>

                  {openSimple && (
                    <div style={panelStyle}>
                      {PANELS[key].map((it) =>
                        it === "Shaggy Cow Lounge" ? (
                          <Link
                            key={it}
                            href={LOUNGE}
                            className="dd-row"
                            style={{ ...ddRowStyle, color: "#1C2925" }}
                          >
                            {it}
                          </Link>
                        ) : (
                          <div key={it} className="dd-row" style={ddRowStyle}>
                            {it}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {openRegions && (
                    <div style={panelStyle}>
                      {REGIONS.map((r) => {
                        const on = r.name === region;
                        return (
                          <div
                            key={r.name}
                            onMouseEnter={() => setRegion(r.name)}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "15px 22px",
                              cursor: "pointer",
                              ...(on
                                ? {
                                    background: "#F0F5EE",
                                    color: "#B4512F",
                                    boxShadow: "inset 3px 0 0 #B4512F",
                                  }
                                : null),
                            }}
                          >
                            <span style={{ fontSize: 14.5, fontWeight: 500 }}>
                              {r.name}
                            </span>
                            <span style={{ fontSize: 13, color: "#8A9C91" }}>
                              ›
                            </span>
                          </div>
                        );
                      })}
                      <div
                        style={{
                          position: "absolute",
                          top: -1,
                          left: "100%",
                          width: 250,
                          minHeight: 300,
                          background: "#FFFFFF",
                          border: "1px solid #C9D6C4",
                          borderLeft: "none",
                          boxShadow: "0 20px 38px -24px rgba(28,41,37,0.42)",
                          display: "flex",
                          flexDirection: "column",
                          padding: "8px 0",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px 22px 12px",
                            fontSize: 10.5,
                            letterSpacing: "0.14em",
                            color: "#B4512F",
                            fontWeight: 600,
                            borderBottom: "1px solid #E4EDE1",
                          }}
                        >
                          {activeRegion.name}
                        </div>
                        {activeRegion.farms.map((f) => (
                          <div
                            key={f.city + f.state}
                            className="farm-row"
                            style={{
                              padding: "12px 22px",
                              cursor: "pointer",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 14.5,
                                fontWeight: 600,
                                color: "#1C2925",
                              }}
                            >
                              {f.city}
                            </span>
                            <span style={{ fontSize: 12.5, color: "#6B7C73" }}>
                              {f.state}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flex: "0 0 auto",
            }}
          >
            <span
              className="btn btn-outline-dark tap"
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "9px 13px",
                border: "1.5px solid #1C2925",
                whiteSpace: "nowrap",
              }}
            >
              Become a Partner Farm
            </span>
            <Link
              href={LOUNGE}
              className="btn btn-primary tap"
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "10px 15px",
                background: "#B4512F",
                color: "#FFF",
                whiteSpace: "nowrap",
              }}
            >
              Book Now
            </Link>
          </div>
        </header>
      </div>

      {/* ================================ HERO ================================ */}
      <section style={{ position: "relative", height: 620, background: "#1C2925" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <ImageSlot
            placeholder="Hero video — wide horizontal footage of the lounge pen. Drop a still; swap for your video file."
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(22,33,29,0.18) 0%, rgba(22,33,29,0) 40%, rgba(22,33,29,0.66) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            padding: "0 56px 56px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <h1
            style={{
              fontFamily: NEWSREADER,
              fontSize: 38,
              lineHeight: 1.1,
              fontWeight: 700,
              margin: 0,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 20px rgba(22,33,29,0.55)",
            }}
          >
            Come sit with the herd.
          </h1>
          <div
            style={{
              fontSize: 12.5,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#F1E8D5",
              fontWeight: 500,
              textShadow: "0 2px 14px rgba(22,33,29,0.6)",
            }}
          >
            The Shaggy Cow Lounge
          </div>
          <Link
            href={LOUNGE}
            className="btn btn-primary tap"
            style={{
              fontSize: 14.5,
              fontWeight: 600,
              padding: "14px 30px",
              background: "#B4512F",
              color: "#FFF",
              marginTop: 8,
            }}
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* =============================== OFFER =============================== */}
      <section style={{ padding: "40px 40px", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            background: "#DDE8D9",
            border: "1px solid #C2D4BD",
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 0,
            alignItems: "stretch",
          }}
        >
          <div style={{ position: "relative", width: 300, height: 300, minWidth: 0 }}>
            <ImageSlot placeholder="Farm lunch board — cheese, honey, bread on a wood table" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
              padding: "36px 44px",
              minWidth: 0,
            }}
          >
            <div style={eyebrow}>Current offer</div>
            <h2
              style={{
                fontFamily: NEWSREADER,
                fontSize: 30,
                lineHeight: 1.15,
                fontWeight: 700,
                margin: 0,
                color: "#B4512F",
              }}
            >
              Lunch&apos;s on us.
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: "#4A5A52",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              Book any morning session before 11am and we&apos;ll set out a farm
              lunch board for your table — local cheese, honey from the property,
              fresh bread and something warm from the barn kitchen. It arrives
              while you&apos;re still in the pen, so you can eat with hay in your
              hair and a cow watching you do it. No code, no catch, no upgrade to
              select. Just book before eleven and come hungry.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                flexWrap: "wrap",
                marginTop: 4,
              }}
            >
              <Link
                href={LOUNGE}
                className="btn btn-primary tap"
                style={{
                  fontSize: 14.5,
                  fontWeight: 600,
                  padding: "13px 28px",
                  background: "#B4512F",
                  color: "#FFF",
                }}
              >
                Book With Lunch
              </Link>
              <span
                style={{ fontSize: 12.5, fontStyle: "italic", color: "#6B7C73" }}
              >
                *Terms and conditions apply
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= OUR FARMS ============================= */}
      <section style={{ padding: "40px 0", background: "#FFFFFF" }}>
        <div
          style={{
            padding: "0 40px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "center",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <div style={displayHeading}>Our farms</div>
          <h2 style={{ ...subHeading, maxWidth: "44ch" }}>
            Eleven farms. One very good afternoon.
          </h2>
        </div>
        <div
          className="rail"
          ref={railRef}
          style={{
            display: "flex",
            gap: 22,
            overflowX: "auto",
            padding: "0 40px 4px",
            scrollBehavior: "smooth",
          }}
        >
          {FARM_LIST.map((f) => (
            <div
              key={f.city + f.state}
              style={{
                flex: "0 0 300px",
                position: "relative",
                height: 380,
                cursor: "pointer",
                minWidth: 0,
              }}
            >
              <ImageSlot placeholder={`Photo of the ${f.city} farm`} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(22,33,29,0) 52%, rgba(22,33,29,0.76) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 24,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: NEWSREADER,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.25,
                  }}
                >
                  {f.city}, {f.state}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            marginTop: 24,
          }}
        >
          {Array.from({ length: pages }, (_, i) => (
            <div
              key={i}
              onClick={() => goPage(i)}
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                cursor: "pointer",
                transition: "background 160ms ease, border-color 160ms ease",
                ...(page === i
                  ? { background: "#B4512F", border: "1.5px solid #B4512F" }
                  : { background: "transparent", border: "1.5px solid #B5C7B0" }),
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
          <span
            className="btn btn-outline-dark tap"
            style={{
              fontSize: 15,
              fontWeight: 600,
              padding: "15px 32px",
              border: "1.5px solid #1C2925",
            }}
          >
            View All Locations
          </span>
        </div>
      </section>

      {/* ========================= LOUNGING, UPGRADED ========================= */}
      <section style={{ padding: "40px 40px", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={displayHeading}>Lounging, upgraded</div>
            <h2 style={{ ...subHeading, maxWidth: "48ch" }}>
              There&apos;s more to do than sit. Not that sitting isn&apos;t the
              point.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 22,
            }}
          >
            {UPGRADES.map((u) => (
              <div
                key={u.name}
                style={{
                  position: "relative",
                  height: 460,
                  cursor: "pointer",
                  minWidth: 0,
                }}
              >
                <ImageSlot placeholder={u.ph} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(22,33,29,0) 40%, rgba(22,33,29,0.78) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: NEWSREADER,
                      fontSize: 27,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      lineHeight: 1.15,
                    }}
                  >
                    {u.name}
                  </div>
                  <div
                    style={{
                      fontSize: 14.5,
                      color: "#DCE7DC",
                      lineHeight: 1.5,
                      maxWidth: "30ch",
                    }}
                  >
                    {u.note}
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "#A9C6A5",
                      marginTop: 4,
                    }}
                  >
                    {u.cta} →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FIND YOUR FARM ============================ */}
      <section style={{ padding: "40px 40px", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "center",
          }}
        >
          <div style={displayHeading}>Find your farm</div>
          <h2 style={{ ...subHeading, textAlign: "center", maxWidth: "44ch" }}>
            Odds are there&apos;s a herd near you.
          </h2>
          <p
            style={{
              fontSize: 14.5,
              color: "#6B7C73",
              margin: "0 0 10px",
              textAlign: "center",
            }}
          >
            Hover a farmhouse to see where it is.
          </p>
          <FarmMap style={{ width: "100%" }} />
        </div>
      </section>

      {/* ============================== REVIEWS ============================== */}
      <section style={{ padding: "30px 40px", background: "#F1E8D5" }}>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              minWidth: 0,
            }}
          >
            <h2
              style={{
                fontFamily: NEWSREADER,
                fontSize: 22,
                lineHeight: 1.15,
                fontWeight: 700,
                margin: 0,
                color: "#B4512F",
              }}
            >
              The reviews don&apos;t stop coming in.
            </h2>
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D9E2D6",
                  padding: "14px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: NEWSREADER,
                    fontSize: 14.5,
                    lineHeight: 1.4,
                    margin: 0,
                    color: "#1C2925",
                    fontWeight: 700,
                    textWrap: "pretty",
                  }}
                >
                  {r.quote}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    borderTop: "1px solid #D9E2D6",
                    paddingTop: 10,
                  }}
                >
                  <span
                    style={{ fontSize: 11.5, color: "#6B7C73", minWidth: 0 }}
                  >
                    {r.who}
                  </span>
                  <span
                    style={{
                      color: "#B4512F",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ★★★★★
                  </span>
                </div>
              </div>
            ))}
            <span
              className="btn btn-primary tap"
              style={{
                fontSize: 13.5,
                fontWeight: 600,
                padding: "11px 24px",
                background: "#B4512F",
                color: "#FFF",
                alignSelf: "flex-start",
              }}
            >
              See All Reviews
            </span>
          </div>
          <div style={{ position: "relative", height: "100%", minWidth: 0 }}>
            <ImageSlot placeholder="Kids and adults interacting with the cows on the farm" />
          </div>
        </div>
      </section>

      {/* ============================= NEWSLETTER ============================= */}
      <section style={{ padding: "40px 40px 96px", background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            background: "#DDE8D9",
            border: "1px solid #C2D4BD",
            padding: "44px 48px",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minWidth: 0,
            }}
          >
            <h2
              style={{
                fontFamily: NEWSREADER,
                fontSize: 30,
                lineHeight: 1.15,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Get the herd in your inbox.
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "#4A5A52",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              New farms, new calves, and first access to peak weekends. About one
              email a month.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minWidth: 0,
            }}
          >
            <form
              style={{ display: "flex", gap: 0 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                style={{
                  flex: 1,
                  border: "1.5px solid #1C2925",
                  borderRight: "none",
                  padding: "15px 18px",
                  fontSize: 15,
                  color: "#1C2925",
                  minWidth: 0,
                  background: "#FFFFFF",
                  outline: "none",
                  fontFamily: "inherit",
                  borderRadius: 0,
                }}
              />
              <button
                type="submit"
                className="btn btn-primary tap"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "15px 26px",
                  background: "#B4512F",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Sign Up
              </button>
            </form>
            <span style={{ fontSize: 12.5, color: "#6B7C73", lineHeight: 1.5 }}>
              By signing up you agree to our <a href="#privacy">privacy policy</a>.
            </span>
          </div>
        </div>
      </section>

      {/* =============================== FOOTER =============================== */}
      <footer
        style={{ background: "#24382F", color: "#C3D4C7", padding: "60px 40px 32px" }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr 1fr 1fr",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: NEWSREADER,
                fontSize: 21,
                fontWeight: 700,
                color: "#F1E8D5",
              }}
            >
              The Cowabunga Camp
            </div>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "34ch",
              }}
            >
              Highland cow experiences on eleven partner farms across the country.
            </p>
            <span
              className="btn btn-outline-sage tap"
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 20px",
                border: "1.5px solid #A9C6A5",
                color: "#A9C6A5",
                alignSelf: "flex-start",
              }}
            >
              Become a Partner Farm
            </span>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 6,
                fontSize: 13,
                letterSpacing: "0.08em",
              }}
            >
              <span>IG</span>
              <span>FB</span>
              <span>TT</span>
              <span>YT</span>
            </div>
          </div>
          <FooterCol
            heading="CONNECT"
            items={["Contact Us", "Become a Partner Farm", "Group & Event Enquiries"]}
          />
          <FooterCol
            heading="HELPFUL LINKS"
            items={["FAQ", "Gift Cards", "Shop", "Journal", "Find a Farm", "The Herd", "Reviews"]}
          />
          <FooterCol
            heading="BOOK"
            items={["Shaggy Cow Lounge", "Private Farm Tours", "Bottle Feeding", "Glamping Yurts", "Events & Buyouts"]}
          />
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "40px auto 0",
            borderTop: "1px solid #3A5449",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12.5,
            color: "#95AE9E",
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

/* --------------------------- small helpers --------------------------- */

function FooterCol({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        fontSize: 14.5,
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "#95AE9E",
          fontWeight: 600,
          marginBottom: 5,
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

const panelStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: "50%",
  marginLeft: -125,
  width: 250,
  minHeight: 300,
  background: "#FFFFFF",
  border: "1px solid #C9D6C4",
  boxShadow: "0 20px 38px -24px rgba(28,41,37,0.42)",
  display: "flex",
  flexDirection: "column",
  padding: "8px 0",
  zIndex: 50,
};

const ddRowStyle: React.CSSProperties = {
  padding: "15px 22px",
  fontSize: 14.5,
  fontWeight: 500,
  color: "#1C2925",
  cursor: "pointer",
};

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#B4512F",
  fontWeight: 600,
};

const displayHeading: React.CSSProperties = {
  fontFamily: NEWSREADER,
  fontSize: 42,
  lineHeight: 1.08,
  color: "#B4512F",
  fontWeight: 700,
};

const subHeading: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 1.45,
  fontWeight: 500,
  margin: 0,
  color: "#1C2925",
};
