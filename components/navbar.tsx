"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Search,
  Phone,
  Compass,
  SlidersHorizontal,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "collection", label: "Collection" },
  { id: "showcase", label: "3D Showcase", badge: "3D" },
  { id: "why-us", label: "Why Us" },
  { id: "approach", label: "Our Approach" },
  { id: "testimonials", label: "Perspectives" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll position & calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / winHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["top", "collection", "showcase", "why-us", "approach", "testimonials", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`forma-nav-header ${isScrolled ? "forma-nav-scrolled" : "forma-nav-top"}`}
      >
        <div className="forma-nav-container">
          <div className="forma-nav-bar">
            {/* Left: Brand Monogram & Wordmark */}
            <a
              href="#top"
              onClick={(e) => handleLinkClick(e, "#top")}
              className="forma-nav-brand"
              aria-label="Forma Estate Home"
            >
              <div className="forma-brand-icon">
                <span className="brand-gem" />
              </div>
              <div className="forma-brand-text">
                <span className="brand-main">FORMA</span>
                <span className="brand-sep">—</span>
                <span className="brand-sub">ESTATE</span>
              </div>
            </a>

            {/* Center: Desktop Navigation Links with Floating Indicator */}
            <nav className="forma-desktop-links" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, `#${item.id}`)}
                    className={`forma-nav-link ${isActive ? "forma-nav-link-active" : ""}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="forma-nav-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="nav-link-label">{item.label}</span>
                    {item.badge && (
                      <span className="forma-nav-badge">{item.badge}</span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Actions, Status & CTA */}
            <div className="forma-nav-actions">
              {/* Live Portfolio Status Pill (Desktop only) */}
              <div className="forma-nav-status-pill" title="Private Real Estate Network">
                <span className="status-dot">
                  <span className="status-dot-ping" />
                </span>
              </div>

              {/* Quick Search / Filter shortcut */}
              <a
                href="#collection"
                onClick={(e) => handleLinkClick(e, "#collection")}
                className="forma-nav-icon-btn"
                aria-label="Search Properties"
                title="Search Properties"
              >
                <Search className="w-3.5 h-3.5" />
              </a>

              {/* Primary Consultation CTA */}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="forma-nav-cta-btn"
              >
                <span>Consultation</span>
                <ArrowUpRight className="cta-arrow" />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="forma-mobile-toggle"
                aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Micro Progress Bar on the bottom of the floating navbar */}
          <div className="forma-nav-progress-track">
            <div
              className="forma-nav-progress-bar"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="forma-mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="forma-mobile-drawer-content"
              initial={{ y: -30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-drawer-top">
                <div className="mobile-drawer-status">
                  <span className="status-dot">
                    <span className="status-dot-ping" />
                  </span>
                  <span>International Private Portfolio</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-drawer-close"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mobile-drawer-nav">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, `#${item.id}`)}
                      className={`mobile-nav-link ${isActive ? "active" : ""}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx + 0.1 }}
                    >
                      <span className="mobile-nav-num">0{idx + 1}</span>
                      <span className="mobile-nav-title">{item.label}</span>
                      {item.badge && <span className="mobile-nav-badge">{item.badge}</span>}
                      <ArrowUpRight className="mobile-nav-arrow" />
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mobile-drawer-footer">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="mobile-drawer-cta"
                >
                  Arrange Private Consultation
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>

                <div className="mobile-drawer-meta">
                  <div className="mobile-meta-item">
                    <span className="meta-label">Direct Advisory</span>
                    <a href="mailto:concierge@formaestate.com" className="meta-val">
                      concierge@formaestate.com
                    </a>
                  </div>
                  <div className="mobile-meta-item">
                    <span className="meta-label">Destinations</span>
                    <span className="meta-val">Portugal · Italy · Spain · France</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
