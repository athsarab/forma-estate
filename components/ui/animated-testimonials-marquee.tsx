"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  avatar: string;
  name: string;
  handle: string;
  role?: string;
  text: string;
  highlight?: string;
  tag?: string;
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Ryan Delk",
    handle: "@delk",
    role: "Founder & Investor",
    tag: "Buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Don't take it from me: @formaestate is magic. The discretion, curation, and architectural calibre are in a league of their own.",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    role: "Product Designer & Architect",
    tag: "Collector",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    text: "I'm keeping @formaestate bookmarked *all* the time. Whether scouting restored Dutch colonials in Galle or minimalist coastal villas, it's rare to see a team work with such discerning taste.",
  },
  {
    name: "Demetria Giles",
    handle: "@drosewritings",
    role: "Creative Director & Author",
    tag: "Resident",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Exploring residences with @formaestate felt like a private exhibition. We finalized our Colombo 07 sanctuary in record time. A true design lover's dream come true.",
  },
  {
    name: "Jeremy McPeak",
    handle: "@jmcpeak",
    role: "Engineering Director",
    tag: "Investor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    text: "I just completed the acquisition of our Kandy hillside retreat through @formaestate, and holy crap! Completely transparent legal diligence, zero friction, and panoramic mountain views.",
  },
  {
    name: "Jonathan Simcoe",
    handle: "@jdsimcoe",
    role: "Design Director",
    tag: "Patron",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    text: "All righty. I have to give a massive shoutout to the team at @formaestate. Matured to a point where speed, architectural clarity, and attention to detail are simply superb.",
  },
  {
    name: "Sean Rose",
    handle: "@seanrose",
    role: "Founder",
    tag: "Buyer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Really liking @formaestate so far. It's just the right amount of effortless and high-touch for prime property acquisition, doing all the hard work in the background.",
  },
  {
    name: "Anya Senanayake",
    handle: "@anya_arch",
    role: "Principal Architect",
    tag: "Architect",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
    text: "As an architect, finding a real estate team that respects tropical modernism and Geoffrey Bawa's legacy is rare. @formaestate is setting a new benchmark for Sri Lanka.",
  },
  {
    name: "David Chen",
    handle: "@davidc_cap",
    role: "Private Equity Partner",
    tag: "Investor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Acquiring an offshore estate in Southern Province felt daunting until we partnered with @formaestate. Impeccable title verification and trusted local escrow representation.",
  },
];

export interface AnimatedTestimonialsMarqueeProps {
  testimonials?: Testimonial[];
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export function AnimatedTestimonialsMarquee({
  testimonials = DEFAULT_TESTIMONIALS,
  speed = 42,
  pauseOnHover = true,
  className,
}: AnimatedTestimonialsMarqueeProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  // Split testimonials into two balanced rows
  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half);

  // Helper to render text with highlighted @mentions or keywords
  const renderFormattedText = (content: string) => {
    const parts = content.split(/(@\w+|forma estate|FORMA—ESTATE|reflectnotes)/gi);
    return parts.map((part, i) => {
      if (
        part.startsWith("@") ||
        part.toLowerCase() === "forma estate" ||
        part === "FORMA—ESTATE" ||
        part.toLowerCase() === "reflectnotes"
      ) {
        return (
          <span key={i} className="tm-mention">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Helper to render a card
  const renderCard = (t: Testimonial, key: string | number) => {
    return (
      <div key={key} className="tm-card" tabIndex={0} role="article">
        <div className="tm-card-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.avatar}
            alt={t.name}
            className="tm-avatar"
            loading="lazy"
            width={44}
            height={44}
          />
          <div className="tm-user-info">
            <div className="tm-name-row">
              <span className="tm-name">{t.name}</span>
              {t.tag && <span className="tm-tag">{t.tag}</span>}
            </div>
            <span className="tm-handle">{t.handle}</span>
          </div>
        </div>
        <p className="tm-text">{renderFormattedText(t.text)}</p>
      </div>
    );
  };

  // Duplicate items 2 times per row to guarantee seamless, continuous infinite scroll on wide screens
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <div
      className={cn("tm-container", className)}
      style={{ ["--tm-speed" as string]: `${speed}s` }}
    >
      {/* Background ambient glow effect matching the screenshot */}
      <div className="tm-ambient-glow" aria-hidden="true" />

      {/* Edge gradient masks for smooth fade-in / fade-out */}
      <div className="tm-edge-gradient tm-edge-left" aria-hidden="true" />
      <div className="tm-edge-gradient tm-edge-right" aria-hidden="true" />

      {/* Row 1: Scrolling Left */}
      <div
        className={cn("tm-row-wrapper", pauseOnHover && "tm-pause-on-hover")}
        aria-label="Client perspectives row 1"
      >
        <div className="tm-track tm-scroll-left">
          {duplicatedRow1.map((item, index) => renderCard(item, `r1-a-${index}`))}
          {duplicatedRow1.map((item, index) => renderCard(item, `r1-b-${index}`))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div
        className={cn(
          "tm-row-wrapper tm-row-offset",
          pauseOnHover && "tm-pause-on-hover"
        )}
        aria-label="Client perspectives row 2"
      >
        <div className="tm-track tm-scroll-right">
          {duplicatedRow2.map((item, index) => renderCard(item, `r2-a-${index}`))}
          {duplicatedRow2.map((item, index) => renderCard(item, `r2-b-${index}`))}
        </div>
      </div>
    </div>
  );
}

export default AnimatedTestimonialsMarquee;
