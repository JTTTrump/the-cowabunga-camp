"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoAlbersUsa, geoPath, type GeoProjection } from "d3-geo";
import { feature, mesh } from "topojson-client";

/* Real lat/lon for all eleven partner farms (from the design handoff). */
const FARMS = [
  { city: "Ann Arbor", state: "Michigan", lon: -83.743, lat: 42.2808 },
  { city: "Asheville", state: "North Carolina", lon: -82.5515, lat: 35.5951 },
  { city: "Bozeman", state: "Montana", lon: -111.0429, lat: 45.677 },
  { city: "Fort Collins", state: "Colorado", lon: -105.0844, lat: 40.5853 },
  { city: "Fredericksburg", state: "Texas", lon: -98.872, lat: 30.2752 },
  { city: "Jacksonville", state: "Florida", lon: -81.6557, lat: 30.3322 },
  { city: "Madison", state: "Wisconsin", lon: -89.4012, lat: 43.0731 },
  { city: "Nashville", state: "Tennessee", lon: -86.7816, lat: 36.1627 },
  { city: "Ocala", state: "Florida", lon: -82.1401, lat: 29.1872 },
  { city: "Scottsdale", state: "Arizona", lon: -111.9261, lat: 33.4942 },
  { city: "Sonoma", state: "California", lon: -122.458, lat: 38.2919 },
];

const W = 1000;
const H = 600;
const AMBER = "#B4512F";
const INK = "#1C2925";
const LAND = "#F0EBE2";
const INNER = "#DAD2C6";
const OUTER = "#B3A896";

/* Gambrel-roof barn glyph, S = master size multiplier (matches prototype). */
const S = 1.5;
const ROOF = `M ${-8.6 * S} ${-5.8 * S} L ${-6.1 * S} ${-9.9 * S} L 0 ${-12.4 * S} L ${6.1 * S} ${-9.9 * S} L ${8.6 * S} ${-5.8 * S} Z`;
const BRACE = `M ${-2.9 * S} ${-4.4 * S} L ${2.9 * S} 0 M ${2.9 * S} ${-4.4 * S} L ${-2.9 * S} 0`;

function Barn() {
  return (
    <>
      <path d={ROOF} fill={AMBER} />
      <rect
        x={-7 * S}
        y={-5.9 * S}
        width={14 * S}
        height={5.9 * S}
        fill={AMBER}
      />
      {/* hay-loft window */}
      <rect
        x={-1.3 * S}
        y={-9.3 * S}
        width={2.6 * S}
        height={2.2 * S}
        fill="#FFFFFF"
      />
      {/* double door */}
      <rect
        x={-2.9 * S}
        y={-4.4 * S}
        width={5.8 * S}
        height={4.4 * S}
        fill="#FFFFFF"
      />
      {/* cross-bracing */}
      <path d={BRACE} fill="none" stroke={AMBER} strokeWidth={0.85 * S} />
    </>
  );
}

type Tip = { left: number; top: number; city: string; state: string } | null;

export default function FarmMap({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [topo, setTopo] = useState<any>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [tip, setTip] = useState<Tip>(null);

  useEffect(() => {
    let alive = true;
    fetch("/us-states-10m.json")
      .then((r) => r.json())
      .then((data) => {
        if (alive) setTopo(data);
      })
      .catch(() => {
        /* map is progressive enhancement; fail quietly */
      });
    return () => {
      alive = false;
    };
  }, []);

  const geo = useMemo(() => {
    if (!topo?.objects?.states) return null;
    const states = feature(topo, topo.objects.states) as any;
    const interior = mesh(topo, topo.objects.states, (a: any, b: any) => a !== b);
    const outline = mesh(topo, topo.objects.states, (a: any, b: any) => a === b);
    const projection: GeoProjection = geoAlbersUsa().fitExtent(
      [
        [16, 16],
        [W - 16, H - 16],
      ],
      states
    );
    const path = geoPath(projection);
    const pins = FARMS.map((f) => {
      const p = projection([f.lon, f.lat]);
      return p ? { ...f, x: p[0], y: p[1] } : null;
    }).filter(Boolean) as Array<
      (typeof FARMS)[number] & { x: number; y: number }
    >;
    return {
      features: states.features as any[],
      interior: path(interior as any) || "",
      outline: path(outline as any) || "",
      path,
      pins,
    };
  }, [topo]);

  function showTip(i: number, x: number, y: number) {
    const el = wrapRef.current;
    const scale = el ? el.getBoundingClientRect().width / W : 1;
    setHover(i);
    setTip({
      left: x * scale,
      top: y * scale - 26,
      city: FARMS[i].city,
      state: FARMS[i].state,
    });
  }

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", ...style }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
        role="img"
        aria-label="Map of the United States showing eleven Cowabunga Camp partner farms"
      >
        {geo && (
          <>
            <g>
              {geo.features.map((feat, i) => (
                <path key={i} d={geo.path(feat as any) || ""} fill={LAND} />
              ))}
            </g>
            <path d={geo.interior} fill="none" stroke={INNER} strokeWidth={0.9} />
            <path d={geo.outline} fill="none" stroke={OUTER} strokeWidth={1.4} />
            <g>
              {geo.pins.map((f, i) => (
                <g
                  key={f.city}
                  transform={`translate(${f.x},${f.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => showTip(i, f.x, f.y)}
                  onMouseLeave={() => {
                    setHover(null);
                    setTip(null);
                  }}
                >
                  <circle r={24} fill="transparent" />
                  <g
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transform:
                        hover === i ? "scale(1.22)" : "scale(1)",
                      transition: "transform 120ms ease",
                    }}
                  >
                    <Barn />
                  </g>
                </g>
              ))}
            </g>
          </>
        )}
      </svg>

      {tip && (
        <div
          style={{
            position: "absolute",
            left: tip.left,
            top: tip.top,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            background: INK,
            color: "#F1E8D5",
            padding: "11px 17px",
            font: "600 15.5px/1.3 var(--font-dm-sans), Helvetica, sans-serif",
            whiteSpace: "nowrap",
            zIndex: 5,
          }}
        >
          <span style={{ color: "#A9C6A5" }}>{tip.city}</span>, {tip.state}
        </div>
      )}
    </div>
  );
}
