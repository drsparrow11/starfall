import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CADENCE // STARFALL | Before the Signal Fades — Chapter 8",
  description: "A recovered music profile, an unfinished project, and the songs that found their way home.",
  icons: { icon: "/archive/album-cover.png" },
  openGraph: {
    title: "STARFALL — Before the Signal Fades · Chapter 8",
    description: "Cadence’s recovered music profile. Fourteen songs. One unfinished project waiting at bar 72.",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "STARFALL — Before the Signal Fades, Chapter 8" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "STARFALL — Chapter 8",
    description: "The project was never empty. It was waiting.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
