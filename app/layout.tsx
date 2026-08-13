import type { Metadata } from "next";
import { Newsreader, DM_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "The Cowabunga Camp — Come sit with the herd.",
  description:
    "Highland-cow experiences on eleven partner farms across the US. The Shaggy Cow Lounge is sixty minutes in the straw with the herd.",
  openGraph: {
    title: "The Cowabunga Camp",
    description:
      "Highland-cow experiences on eleven partner farms. Come sit with the herd.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
