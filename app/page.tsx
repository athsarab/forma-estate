"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero";
import {
  CoverflowCarousel,
  CoverflowSlide,
} from "@/components/ui/coverflow-carousel";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhyWorkWithUs } from "@/components/why-work-with-us";
import {
  PROPERTIES,
  LOCATIONS,
  CATEGORIES,
  type TransactionType,
  type PropertyCategory,
} from "@/lib/properties";
import { AGENCY_CONFIG, buildWhatsAppUrl } from "@/lib/config";
import { AnimatedTestimonialsMarquee } from "@/components/AnimatedTestimonialsMarquee";
// ─── Showcase slides drawn from Sri Lankan property data ──────────────────────
const showcaseSlides: CoverflowSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Cinnamon Hill Residence, Colombo 07 — premium family home",
    title: "Cinnamon Hill Residence",
    subtitle: "Colombo 07 · Colonial Architecture & Mature Gardens",
    badge: "Prime Location",
    meta: [
      { label: "Price", value: "LKR 95,000,000" },
      { label: "Type", value: "Luxury House" },
      { label: "Beds / Baths", value: "5 Beds · 4 Baths" },
      { label: "Floor Area", value: "4,200 sq ft" },
      { label: "Land", value: "20 Perches" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    alt: "Ocean View Villa, Negombo — coastal villa near the beach",
    title: "Ocean View Villa",
    subtitle: "Negombo · Coastal Villa · 300m from Beach",
    badge: "Sea View",
    meta: [
      { label: "Price", value: "LKR 68,000,000" },
      { label: "Type", value: "Villa" },
      { label: "Beds / Baths", value: "4 Beds · 3 Baths" },
      { label: "Floor Area", value: "3,100 sq ft" },
      { label: "Land", value: "28 Perches" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Galle Fort Townhouse — restored Dutch-period property",
    title: "Galle Fort Townhouse",
    subtitle: "Galle Fort · UNESCO Heritage · Restored Dutch Period",
    badge: "Heritage",
    meta: [
      { label: "Price", value: "LKR 55,000,000" },
      { label: "Type", value: "Heritage House" },
      { label: "Beds / Baths", value: "3 Beds · 3 Baths" },
      { label: "Floor Area", value: "2,800 sq ft" },
      { label: "Land", value: "12 Perches" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
    alt: "Rajagiriya Sky Penthouse — panoramic Colombo views",
    title: "Rajagiriya Sky Penthouse",
    subtitle: "Rajagiriya · Panoramic Wetland & City Views",
    badge: "Penthouse",
    meta: [
      { label: "Price", value: "LKR 48,000,000" },
      { label: "Type", value: "Penthouse" },
      { label: "Beds / Baths", value: "3 Beds · 3 Baths" },
      { label: "Floor Area", value: "2,100 sq ft" },
      { label: "Private Terrace", value: "Rooftop" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    alt: "Dehiwala Garden Villa for rent — spacious family villa with pool",
    title: "Dehiwala Garden Villa",
    subtitle: "Dehiwala · Family Villa · Private Pool",
    badge: "Premium Rental",
    meta: [
      { label: "Rent", value: "LKR 250,000 / mo" },
      { label: "Type", value: "Villa" },
      { label: "Beds / Baths", value: "5 Beds · 4 Baths" },
      { label: "Floor Area", value: "4,800 sq ft" },
      { label: "Land", value: "35 Perches" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=85",
    alt: "Havelock Town Luxury Apartment — new completion Colombo 05",
    title: "Havelock Town Apartment",
    subtitle: "Colombo 05 · New Completion · Rooftop Pool",
    badge: "New Completion",
    meta: [
      { label: "Price", value: "LKR 37,500,000" },
      { label: "Type", value: "Apartment" },
      { label: "Beds / Baths", value: "3 Beds · 2 Baths" },
      { label: "Floor Area", value: "1,750 sq ft" },
      { label: "Building", value: "Full Amenity" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=85",
    alt: "Negombo Lagoon-View House — contemporary family home with lagoon views",
    title: "Negombo Lagoon-View House",
    subtitle: "Negombo · Lagoon Views · Contemporary Design",
    badge: "Lagoon View",
    meta: [
      { label: "Price", value: "LKR 45,000,000" },
      { label: "Type", value: "House" },
      { label: "Beds / Baths", value: "4 Beds · 3 Baths" },
      { label: "Floor Area", value: "2,900 sq ft" },
      { label: "Land", value: "22 Perches" },
    ],
  },
];

// ─── Sri Lankan location highlights (replaces European destinations) ──────────
const destinations: [string, string, string][] = [
  [
    "Colombo",
    "The commercial and cultural heart of Sri Lanka. Premium apartments, luxury residences, and commercial properties in a dynamic, fast-growing city.",
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Galle & South Coast",
    "Historic Galle Fort, golden beaches, and a thriving creative community. Boutique villas, heritage townhouses, and coastal land with exceptional lifestyle appeal.",
    "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Kandy & Hill Country",
    "Sri Lanka's cultural capital, surrounded by rolling tea estates and the misty highlands. Residences with altitude, character, and a distinctly different pace of life.",
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=85",
  ],
];

// ─── Budget filter ranges (LKR) ───────────────────────────────────────────────
const BUDGET_SALE_OPTIONS = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under LKR 20m", min: 0, max: 20_000_000 },
  { label: "LKR 20m – 50m", min: 20_000_000, max: 50_000_000 },
  { label: "LKR 50m – 100m", min: 50_000_000, max: 100_000_000 },
  { label: "LKR 100m+", min: 100_000_000, max: Infinity },
];

const BUDGET_RENT_OPTIONS = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under LKR 100k / mo", min: 0, max: 100_000 },
  { label: "LKR 100k – 250k / mo", min: 100_000, max: 250_000 },
  { label: "LKR 250k+ / mo", min: 250_000, max: Infinity },
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [destination, setDestination] = useState(destinations[0]);

  // Search / filter state
  const [searchIntent, setSearchIntent] = useState<TransactionType>("sale");
  const [propertyType, setPropertyType] = useState<string>("Any type");
  const [location, setLocation] = useState<string>("Any location");
  const [budgetLabel, setBudgetLabel] = useState<string>("Any budget");
  const [bedrooms, setBedrooms] = useState<string>("Any bedrooms");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  const budgetOptions =
    searchIntent === "sale" ? BUDGET_SALE_OPTIONS : BUDGET_RENT_OPTIONS;

  // Reset budget when switching between buy/rent
  function handleIntentChange(intent: TransactionType) {
    setSearchIntent(intent);
    setBudgetLabel("Any budget");
  }

  // ─── Filtered properties ─────────────────────────────────────────────────
  const filteredProperties = useMemo(() => {
    const budgetRange = budgetOptions.find((b) => b.label === budgetLabel) ?? {
      min: 0,
      max: Infinity,
    };

    return PROPERTIES.filter((p) => {
      if (p.transaction !== searchIntent) return false;
      if (propertyType !== "Any type" && p.category !== propertyType)
        return false;
      if (location !== "Any location" && p.location !== location) return false;
      if (
        bedrooms !== "Any bedrooms" &&
        (p.beds === undefined || p.beds < Number(bedrooms))
      )
        return false;
      if (p.priceValue < budgetRange.min || p.priceValue > budgetRange.max)
        return false;
      return true;
    });
  }, [searchIntent, propertyType, location, budgetLabel, bedrooms, budgetOptions]);

  const hasActiveFilters =
    propertyType !== "Any type" ||
    location !== "Any location" ||
    budgetLabel !== "Any budget" ||
    bedrooms !== "Any bedrooms";

  function clearFilters() {
    setPropertyType("Any type");
    setLocation("Any location");
    setBudgetLabel("Any budget");
    setBedrooms("Any bedrooms");
  }

  function submitPropertySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }

  // ─── Enquiry form ─────────────────────────────────────────────────────────
  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || sent) return;
    setSubmitting(true);
    // Frontend-only: no API call. Clearly disclosed in the UI.
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
    }, 600);
  }

  // ─── Hero video autoplay ─────────────────────────────────────────────────
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const playVideo = () => {
      video.play().catch(() => {});
    };
    playVideo();
    const onGesture = () => playVideo();
    window.addEventListener("scroll", onGesture, { passive: true, once: true });
    window.addEventListener("touchstart", onGesture, { passive: true, once: true });
    window.addEventListener("click", onGesture, { passive: true, once: true });
    return () => {
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("click", onGesture);
    };
  }, []);

  return (
    <main>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero" id="top">
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero_faststart.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero_faststart.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Sri Lanka&apos;s Premier Property Showcase</p>
          <h1>
            Exceptional properties.<br />
            <em>Extraordinary possibilities.</em>
          </h1>
          <p className="hero-intro">
            A more considered way to find your place in Sri Lanka. We connect
            discerning buyers and tenants with residences of lasting character
            across Colombo, Galle, Kandy, and beyond.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#collection">
              Explore the collection <span>↗</span>
            </a>
            <a className="text-link light" href="#contact">
              Arrange a viewing <span>↗</span>
            </a>
          </div>
        </div>

        {/* ── Search bar ─────────────────────────────────────────────────── */}
        <form
          className="hero-search"
          onSubmit={submitPropertySearch}
          aria-label="Find a property"
        >
          {/* Buy / Rent toggle */}
          <div className="hero-search-intent" role="group" aria-label="Transaction type">
            <button
              type="button"
              className={searchIntent === "sale" ? "active" : ""}
              onClick={() => handleIntentChange("sale")}
            >
              Buy
            </button>
            <button
              type="button"
              className={searchIntent === "rent" ? "active" : ""}
              onClick={() => handleIntentChange("rent")}
            >
              Rent
            </button>
          </div>

          {/* Property type */}
          <label className="hero-search-field">
            <span>Property type</span>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              aria-label="Property type"
            >
              <option>Any type</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" />
          </label>

          {/* Location */}
          <label className="hero-search-field hero-search-location">
            <span>City or area</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="City or area"
            >
              <option>Any location</option>
              {LOCATIONS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" />
          </label>

          {/* Advanced filters toggle */}
          <button
            className={`hero-filter-toggle ${advancedFiltersOpen ? "active" : ""}`}
            type="button"
            onClick={() => setAdvancedFiltersOpen((o) => !o)}
            aria-expanded={advancedFiltersOpen}
          >
            <SlidersHorizontal aria-hidden="true" />
            <span>Filters{hasActiveFilters ? " •" : ""}</span>
          </button>

          <button className="hero-search-submit" type="submit">
            <Search aria-hidden="true" />
            <span>Search</span>
          </button>

          {/* Advanced filter panel */}
          {advancedFiltersOpen && (
            <div className="hero-advanced-filters">
              <label className="hero-advanced-field">
                <span>Budget</span>
                <select
                  value={budgetLabel}
                  onChange={(e) => setBudgetLabel(e.target.value)}
                >
                  {budgetOptions.map((b) => (
                    <option key={b.label}>{b.label}</option>
                  ))}
                </select>
              </label>
              <label className="hero-advanced-field">
                <span>Bedrooms</span>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option>Any bedrooms</option>
                  <option value="1">1+ bedrooms</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </label>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="hero-clear-filters"
                  onClick={clearFilters}
                  aria-label="Clear all filters"
                >
                  <X aria-hidden="true" size={13} />
                  Clear all
                </button>
              )}
            </div>
          )}
        </form>

        <div className="scroll-cue">
          <span className="scroll-line" /> Scroll to discover
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────────── */}
      <section className="intro section-pad">
        <div>
          <p className="eyebrow dark">Our point of view</p>
          <h2>
            More than a property.<br />
            <em>A place to belong.</em>
          </h2>
        </div>
        <div className="intro-note">
          <p>
            Every home tells a story. We look beyond the floorplan to find the
            light, landscape, and local rhythm that make a property in Sri Lanka
            feel like yours.
          </p>
          <a className="text-link" href="#approach">
            Discover our approach <span>↗</span>
          </a>
        </div>
      </section>

      {/* ── SCROLL EXPANSION ─────────────────────────────────────────────── */}
      <ScrollExpandMedia
        eyebrow="01 / A sense of place"
        title="The art of arriving."
        description="Spaces shaped by Sri Lanka's extraordinary landscapes — selected for the way they make everyday life feel."
        location="Galle Fort, Southern Province"
        mediaSrc="https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=85"
        bgImageSrc="/images/colombo-unsplash.jpg"
      />

      {/* ── COLLECTION ───────────────────────────────────────────────────── */}
      <section className="collection section-pad" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">The collection</p>
            <h2>
              Selected with<br />
              <em>intention.</em>
            </h2>
          </div>
          <p className="section-lead">
            A curated selection of{" "}
            {searchIntent === "sale" ? "properties for sale" : "rental properties"}{" "}
            across Sri Lanka&apos;s most sought-after locations.
          </p>
        </div>

        {/* Demo content notice */}
        <div className="demo-notice" role="note">
          <span>⚠ Demo content</span> — All listings are illustrative sample
          data for agency demonstration. No real prices, availability, or
          ownership is represented.
        </div>

        {filteredProperties.length > 0 ? (
          <div className="property-grid">
            {filteredProperties.map((property, index) => (
              <article
                className={`property-card card-${index}`}
                key={property.slug}
              >
                <div className="property-image">
                  <img
                    src={property.image}
                    alt={`${property.name} — ${property.category} ${property.transaction === "rent" ? "for rent" : "for sale"} in ${property.location}, Sri Lanka`}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="card-index">0{index + 1}</span>
                  {property.badge && (
                    <span className="card-badge">{property.badge}</span>
                  )}
                  <a
                    className="discover"
                    href={`/properties/${property.slug}`}
                  >
                    View property <span>↗</span>
                  </a>
                </div>
                <div className="property-meta">
                  <div>
                    <h3>{property.name}</h3>
                    <p>{property.location}, Sri Lanka</p>
                  </div>
                  <strong>{property.priceDisplay}</strong>
                  <div className="property-stats">
                    <span>{property.category}</span>
                    {property.beds !== undefined && (
                      <span>{property.beds} beds</span>
                    )}
                    {property.areaSqFt && (
                      <span>{property.areaSqFt.toLocaleString()} sq ft</span>
                    )}
                    {property.landPerches && !property.areaSqFt && (
                      <span>{property.landPerches} perches</span>
                    )}
                    <span className={`tx-badge tx-${property.transaction}`}>
                      {property.transaction === "sale" ? "For Sale" : "For Rent"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="property-empty" role="status">
            <p>
              No {searchIntent === "rent" ? "rental " : ""}properties match
              these filters.{" "}
              {hasActiveFilters && (
                <>
                  <button
                    type="button"
                    className="inline-text-btn"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>{" "}
                  or{" "}
                </>
              )}
              <a href="#contact">speak with our team</a>.
            </p>
          </div>
        )}

        <a className="outline-button" href="#why-us">
          Why work with us <span>↗</span>
        </a>
      </section>

      {/* ── 3D SHOWCASE ──────────────────────────────────────────────────── */}
      <section className="showcase dark-section section-pad" id="showcase">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curated Showcase</p>
            <h2>
              Architectural<br />
              <em>perspectives.</em>
            </h2>
          </div>
          <p className="section-lead">
            An interactive 3D exploration of our showcase portfolio. Drag,
            flick, or use keyboard arrows to glide through selected Sri Lankan
            properties.
          </p>
        </div>

        <CoverflowCarousel
          slides={showcaseSlides}
          cardWidth="clamp(250px, 32vw, 420px)"
          rotate={40}
          depth={0.65}
          perspective={3.2}
          falloff={0.56}
          fade={0.12}
          gap={0.07}
          loop={true}
          showCaption={true}
          showPagination={true}
          showNavigation={true}
          label="Sri Lanka Property Showcase 3D Coverflow"
        />
      </section>

      {/* ── WHY WORK WITH US ─────────────────────────────────────────────── */}
      <WhyWorkWithUs />

      {/* ── SRI LANKAN DESTINATIONS ──────────────────────────────────────── */}
      <section className="destinations section-pad" id="approach">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Places to begin</p>
            <h2>
              Beyond the<br />
              <em>coordinates.</em>
            </h2>
          </div>
          <p className="section-lead">
            We know Sri Lanka&apos;s property markets from the inside — coast,
            city, and hill country.
          </p>
        </div>
        <div className="destination-layout">
          <div className="destination-photo">
            <img
              src={destination[2]}
              alt={`${destination[0]} — Sri Lankan real estate`}
            />
          </div>
          <div className="destination-copy">
            <p className="destination-number">
              0{destinations.findIndex((d) => d[0] === destination[0]) + 1} /{" "}
              0{destinations.length}
            </p>
            <h3>{destination[0]}</h3>
            <p>{destination[1]}</p>
            {destinations.map((item) => (
              <button
                className={destination[0] === item[0] ? "active" : ""}
                key={item[0]}
                onClick={() => setDestination(item)}
              >
                {item[0]} <span>↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUYING JOURNEY ───────────────────────────────────────────────── */}
      <section className="journey dark-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your journey</p>
            <h2>
              Considered at<br />
              <em>every step.</em>
            </h2>
          </div>
          <p className="section-lead">
            Buying or renting in Sri Lanka should feel exciting, never opaque.
            We stay close from first conversation to final key.
          </p>
        </div>
        <div className="steps">
          {[
            "Tell us what you are looking for.",
            "Explore a considered shortlist.",
            "Arrange in-person or virtual viewings.",
            "Review the process with qualified local professionals.",
            "Move forward with clarity.",
          ].map((step, index) => (
            <div className="step" key={step}>
              <span>0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ── TESTIMONIALS / PERSPECTIVES ─────────────────────────────────── */}
      <section className="testimonials-section dark-section section-pad" id="testimonials">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Client Perspectives</p>
            <h2>Words from our<br /><em>community.</em></h2>
          </div>
          <p className="section-lead">
            Reflections from patrons, architects, and collectors who have found their home with Forma Estate.
          </p>
        </div>

        <AnimatedTestimonialsMarquee
          speed={42}
          pauseOnHover={true}
        />
      </section>


      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="contact section-pad" id="contact">
        <div className="contact-copy">
          <p className="eyebrow dark">Start a conversation</p>
          <h2>
            Your next chapter<br />
            <em>begins here.</em>
          </h2>
          <p>
            Share a little about what you are looking for. We will come back to
            you personally within two working days.
          </p>
          <div className="contact-direct">
            <a href={`tel:${AGENCY_CONFIG.phone.replace(/\s/g, "")}`} className="contact-direct-link">
              📞 {AGENCY_CONFIG.phone}
            </a>
            <a href={`mailto:${AGENCY_CONFIG.email}`} className="contact-direct-link">
              ✉ {AGENCY_CONFIG.email}
            </a>
            <a
              href={`https://wa.me/${AGENCY_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="contact-direct-link whatsapp-link"
            >
              💬 WhatsApp us
            </a>
          </div>
        </div>

        <form onSubmit={submitInquiry} noValidate>
          {sent ? (
            <div className="success">
              <span>✓</span>
              <h3>Thank you for reaching out.</h3>
              <p>
                Your enquiry has been recorded. We will be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="form-row">
                <label>
                  Full name
                  <input required name="name" autoComplete="name" />
                </label>
                <label>
                  Email address
                  <input required type="email" name="email" autoComplete="email" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Phone number
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  Interested in
                  <select name="interest">
                    <option>Buying a property</option>
                    <option>Renting a property</option>
                    <option>Selling / listing a property</option>
                    <option>General enquiry</option>
                  </select>
                </label>
              </div>
              <label>
                Tell us what you are looking for
                <textarea required name="message" rows={4} />
              </label>
              <button
                className="button button-dark"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : <>Send enquiry <span>↗</span></>}
              </button>
              <small>
                ⚠ This form is a frontend-only demonstration. No enquiry data is
                stored or transmitted. Connect to your CRM or email service
                before launch.
              </small>
            </>
          )}
        </form>
      </section>

      <Footer />
    </main>
  );
}
