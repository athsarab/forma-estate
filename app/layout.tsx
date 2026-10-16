import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forma Estate | A more considered way home",
  description: "Curated residences and trusted guidance for international property buyers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
