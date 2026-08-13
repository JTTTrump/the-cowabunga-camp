import type { CSSProperties } from "react";

/**
 * ImageSlot — production stand-in for the prototype's <image-slot> drop-zone.
 *
 * Renders a placeholder that fills its (positioned) parent: a faint frame,
 * a dashed ring, a photo glyph, and the caption describing the intended
 * shot. Chrome uses `currentColor` so it reads on both light and dark
 * sections. Swap for a real <img>/next/image (or <video> for the hero)
 * when photography lands.
 */
export default function ImageSlot({
  placeholder,
  shape = "rect",
  style,
}: {
  placeholder: string;
  shape?: "rect" | "circle";
  style?: CSSProperties;
}) {
  const radius = shape === "circle" ? "50%" : 0;

  return (
    <div
      role="img"
      aria-label={placeholder}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: radius,
        background: "rgba(127,127,127,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        textAlign: "center",
        padding: 16,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* dashed ring */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          border: "1.5px dashed currentColor",
          borderRadius: radius,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      {/* photo glyph */}
      <svg
        aria-hidden
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: 0.45 }}
      >
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <circle cx="8.5" cy="9.5" r="1.6" />
        <path d="M21 16l-5-5-7 7" />
        <path d="M3 18l4-4 3 3" />
      </svg>
      <span
        style={{
          maxWidth: "90%",
          fontFamily: "var(--font-dm-sans), Helvetica, sans-serif",
          fontSize: 12.5,
          lineHeight: 1.45,
          fontWeight: 500,
          letterSpacing: "0.01em",
          opacity: 0.72,
        }}
      >
        {placeholder}
      </span>
    </div>
  );
}
