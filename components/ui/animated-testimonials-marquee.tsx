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

export interface AnimatedTestimonialsMarqueeProps {
  testimonials: Testimonial[];
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export function AnimatedTestimonialsMarquee({
  testimonials,
  speed = 40,
  pauseOnHover = true,
  className,
}: AnimatedTestimonialsMarqueeProps) {
  // Split testimonials into two staggered rows
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  // Helper to render a card
  const renderCard = (t: Testimonial, key: string | number) => {
    // If text contains a mention or highlighted text like @formaestate
    const renderFormattedText = (content: string) => {
      const parts = content.split(/(@\w+|forma estate|FORMA—ESTATE)/gi);
      return parts.map((part, i) => {
        if (
          part.startsWith("@") ||
          part.toLowerCase() === "forma estate" ||
          part === "FORMA—ESTATE"
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

    return (
      <div key={key} className="tm-card">
        <div className="tm-card-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.avatar}
            alt={t.name}
            className="tm-avatar"
            loading="lazy"
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

  return (
    <div
      className={cn("tm-container", className)}
      style={{ ["--tm-speed" as string]: `${speed}s` }}
    >
      {/* Edge gradient masks for seamless fade out */}
      <div className="tm-edge-gradient tm-edge-left" />
      <div className="tm-edge-gradient tm-edge-right" />

      {/* Row 1: Scrolling Left */}
      <div
        className={cn("tm-row-wrapper", pauseOnHover && "tm-pause-on-hover")}
      >
        <div className="tm-track tm-scroll-left">
          {row1.map((item, index) => renderCard(item, `r1-orig-${index}`))}
          {/* Duplicate set for infinite loop */}
          {row1.map((item, index) => renderCard(item, `r1-dup-${index}`))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div
        className={cn(
          "tm-row-wrapper tm-row-offset",
          pauseOnHover && "tm-pause-on-hover"
        )}
      >
        <div className="tm-track tm-scroll-right">
          {row2.map((item, index) => renderCard(item, `r2-orig-${index}`))}
          {/* Duplicate set for infinite loop */}
          {row2.map((item, index) => renderCard(item, `r2-dup-${index}`))}
        </div>
      </div>
    </div>
  );
}

export default AnimatedTestimonialsMarquee;

