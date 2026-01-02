import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trading Itinerario | Private Trading Residency",
    template: "%s | Trading Itinerario",
  },
  description:
    "A private, on-site trading residency delivering mentorship and disciplined execution frameworks for qualified clients.",
  openGraph: {
    title: "Trading Itinerario | Private Trading Residency",
    description:
      "Private, on-site trading residencies for mentorship and structured collaboration.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
