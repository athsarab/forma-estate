import type { Metadata } from "next";
import "./globals.css";
import { AGENCY_CONFIG } from "@/lib/config";

const siteUrl = AGENCY_CONFIG.domain;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Forma Estate | Premium Property in Sri Lanka",
    template: "%s | Forma Estate",
  },
  description:
    "Discover exceptional houses, villas, apartments, land, and commercial properties across Colombo, Negombo, Kandy, Galle, and Matara. Sri Lanka's premium property showcase.",
  keywords: [
    "Sri Lanka real estate",
    "property for sale Sri Lanka",
    "property for rent Colombo",
    "houses Colombo",
    "apartments Kandy",
    "villas Negombo",
    "land Matara",
    "Galle Fort property",
  ],
  authors: [{ name: "Forma Estate" }],
  creator: "Forma Estate",
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteUrl,
    siteName: "Forma Estate",
    title: "Forma Estate | Premium Property in Sri Lanka",
    description:
      "Exceptional houses, villas, apartments, and land across Sri Lanka — curated for discerning buyers and investors.",
    images: [
      {
        url: "/images/colombo-skyline-jan.jpg",
        width: 1200,
        height: 630,
        alt: "Colombo skyline — Forma Estate Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forma Estate | Premium Property in Sri Lanka",
    description:
      "Exceptional property across Sri Lanka — curated for discerning buyers.",
    images: ["/images/colombo-skyline-jan.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
