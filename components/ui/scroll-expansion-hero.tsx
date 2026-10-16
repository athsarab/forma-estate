"use client";

import Image from "next/image";
import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  eyebrow: string;
  title: string;
  description: string;
  location: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  eyebrow,
  title,
  description,
  location,
  children,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.18, 0.7], [0, 1]);
  const width = useTransform(progress, [0, 1], ["min(38rem, 82vw)", "100vw"]);
  const height = useTransform(progress, [0, 1], ["min(31rem, 68vh)", "min(46rem, 88vh)"]);
  const radius = useTransform(progress, [0, 1], [18, 0]);
  const textY = useTransform(progress, [0, 1], [34, 0]);

  return (
    <section ref={sectionRef} className="expand-section">
      <div className="expand-backdrop">
        <Image src={bgImageSrc} alt="" fill sizes="100vw" className="cover-image" />
      </div>
      <div className="expand-sticky">
        <div className="expand-copy">
          <p className="eyebrow">{eyebrow}</p>
          <motion.h2 style={{ y: reducedMotion ? 0 : textY }}>{title}</motion.h2>
          <motion.p className="expand-description" style={{ opacity: reducedMotion ? 1 : progress }}>
            {description}
          </motion.p>
          <motion.p className="location" style={{ opacity: reducedMotion ? 1 : progress }}>
            <span className="line" /> {location}
          </motion.p>
        </div>
        <motion.div
          className="expand-media"
          style={reducedMotion ? { width: "100%", height: "78vh" } : { width, height, borderRadius: radius }}
        >
          {mediaType === "video" ? (
            <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline preload="metadata" />
          ) : (
            <Image src={mediaSrc} alt="" fill sizes="(max-width: 768px) 100vw, 90vw" className="cover-image" />
          )}
          <div className="media-shade" />
        </motion.div>
        {children}
      </div>
    </section>
  );
};

export default ScrollExpandMedia;
