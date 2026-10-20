"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  hasSpaceBeforeSuffix?: boolean;
  label: string;
  subLabel?: string;
}

const STATS: StatItem[] = [
  {
    value: 5,
    suffix: "+",
    label: "Years",
    subLabel: "Serving Sri Lanka",
  },
  {
    value: 8,
    label: "Property Segments",
    subLabel: "Residential & Commercial",
  },
  {
    value: 120,
    suffix: "+",
    hasSpaceBeforeSuffix: true,
    label: "Demo Listings",
    subLabel: "Illustrative sample data",
  },
  {
    value: 5,
    label: "Key Districts",
    subLabel: "Colombo · Galle · Kandy · Matara · Gampaha",
  },
];

function AnimatedCounter({
  target,
  duration = 1800,
  hasTriggered,
}: {
  target: number;
  duration?: number;
  hasTriggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasTriggered) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, hasTriggered]);

  return <span>{count.toLocaleString()}</span>;
}

export function WhyWorkWithUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="why-us-section"
      aria-label="Why Work With Us"
    >
      <span id="discover" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }} aria-hidden="true" />
      {/* Background layer with Colombo skyline photo from public folder */}
      <div
        className="why-us-bg"
        style={{ backgroundImage: "url('/images/colombo.jpg')" }}
      />
      {/* Soft color grading overlay to preserve rich blue sky and guarantee crystal-clear contrast */}
      <div className="why-us-overlay" />

      {/* Main Content Container */}
      <div className="why-us-container">
        {/* Header copy */}
        <motion.div
          className="why-us-header"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="why-us-title">WHY WORK WITH US</h2>
          <p className="why-us-description">
            We bring local knowledge, market intelligence, and trusted
            professional networks across Sri Lanka&apos;s most sought-after
            property markets — helping buyers, tenants, and investors make
            informed decisions with confidence.
          </p>

          <a href="#collection" className="why-us-cta" aria-label="Explore more properties">
            <span className="why-us-cta-text">EXPLORE MORE</span>
            <span className="why-us-cta-line" />
          </a>
        </motion.div>

        {/* 4 Stats Grid with dividers */}
        <motion.div
          className="why-us-stats-grid"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, idx) => (
            <div key={idx} className="why-us-stat-item">
              <div className="why-us-stat-number">
                <AnimatedCounter target={stat.value} hasTriggered={isInView} />
                {stat.hasSpaceBeforeSuffix ? " " : ""}
                {stat.suffix && <span className="why-us-stat-suffix">{stat.suffix}</span>}
              </div>
              <div className="why-us-stat-label">
                <span>{stat.label}</span>
                {stat.subLabel && <span className="why-us-stat-sublabel">{stat.subLabel}</span>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
