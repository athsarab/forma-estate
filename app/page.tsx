"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { AnimatedTestimonialsMarquee, Testimonial } from "@/components/ui/animated-testimonials-marquee";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhyWorkWithUs } from "@/components/why-work-with-us";

const properties = [
  { name: "Casa Nera", place: "Comporta, Portugal", type: "Villa", beds: 4, area: "286 m²", price: "€1.85m", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" },
  { name: "The Glass House", place: "Mallorca, Spain", type: "Residence", beds: 3, area: "214 m²", price: "€1.2m", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" },
  { name: "Olive Grove Estate", place: "Puglia, Italy", type: "Estate", beds: 5, area: "420 m²", price: "€2.4m", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85" },
];

const destinations = [
  ["Portugal", "Atlantic light, slower days, and a natural connection to the outdoors.", "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85"],
  ["Italy", "Character-rich villages, thoughtful renovation, and an enduring sense of place.", "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=85"],
  ["Spain", "A Mediterranean rhythm with culture, coast, and contemporary architecture.", "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=85"],
];

const showcaseSlides: CoverflowSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    alt: "Casa Nera, Comporta, Portugal",
    title: "Casa Nera",
    subtitle: "Comporta, Portugal · Monolithic Cedar & Reflection Pool",
    badge: "Exclusive",
    meta: [
      { label: "Price", value: "€1.85m" },
      { label: "Type", value: "Private Villa" },
      { label: "Beds / Baths", value: "4 Beds · 5 Baths" },
      { label: "Internal Area", value: "286 m²" },
      { label: "Plot Size", value: "2,400 m²" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    alt: "The Glass House, Mallorca, Spain",
    title: "The Glass House",
    subtitle: "Mallorca, Spain · Balearic Limestone & Floating Cantilever",
    badge: "Featured",
    meta: [
      { label: "Price", value: "€1.20m" },
      { label: "Type", value: "Cliffside Residence" },
      { label: "Beds / Baths", value: "3 Beds · 3 Baths" },
      { label: "Internal Area", value: "214 m²" },
      { label: "Coast Proximity", value: "120 m" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    alt: "Olive Grove Estate, Puglia, Italy",
    title: "Olive Grove Estate",
    subtitle: "Puglia, Italy · Restored 18th-Century Masseria",
    badge: "Private Sale",
    meta: [
      { label: "Price", value: "€2.40m" },
      { label: "Type", value: "Historic Masseria" },
      { label: "Beds / Baths", value: "5 Beds · 6 Baths" },
      { label: "Internal Area", value: "420 m²" },
      { label: "Grove Acreage", value: "4.8 Hectares" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    alt: "Villa Côte Bleue, Cap d'Antibes, France",
    title: "Villa Côte Bleue",
    subtitle: "Cap d'Antibes, France · Riviera Modernist Sanctuary",
    badge: "Prime Location",
    meta: [
      { label: "Price", value: "€4.20m" },
      { label: "Type", value: "Coastal Sanctuary" },
      { label: "Beds / Baths", value: "6 Beds · 7 Baths" },
      { label: "Internal Area", value: "510 m²" },
      { label: "Sea Access", value: "Private Jetty" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Komorebi House, Lake Como, Italy",
    title: "Komorebi House",
    subtitle: "Lake Como, Italy · Botanical Terraces & Boat House",
    badge: "Waterfront",
    meta: [
      { label: "Price", value: "€3.10m" },
      { label: "Type", value: "Lakefront Villa" },
      { label: "Beds / Baths", value: "4 Beds · 4 Baths" },
      { label: "Internal Area", value: "340 m²" },
      { label: "Private Dock", value: "Included" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    alt: "Finca Caelum, Ibiza, Spain",
    title: "Finca Caelum",
    subtitle: "San Lorenzo, Ibiza · Rammed Earth & Lavender Fields",
    badge: "Off-Market",
    meta: [
      { label: "Price", value: "€2.65m" },
      { label: "Type", value: "Contemporary Finca" },
      { label: "Beds / Baths", value: "4 Beds · 4 Baths" },
      { label: "Internal Area", value: "310 m²" },
      { label: "Solar Autonomy", value: "100% Net Zero" },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
    alt: "The Fjord Pavilion, Sunnmøre, Norway",
    title: "The Fjord Pavilion",
    subtitle: "Sunnmøre, Norway · Nordic Timber & Zinc Monolith",
    badge: "Architect's Own",
    meta: [
      { label: "Price", value: "€1.95m" },
      { label: "Type", value: "Nordic Haven" },
      { label: "Beds / Baths", value: "3 Beds · 3 Baths" },
      { label: "Internal Area", value: "260 m²" },
      { label: "Fjord Frontage", value: "180 m" },
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Sean Rose",
    handle: "@seanrose",
    tag: "Private Buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Really liking @formaestate so far. It's just the right amount of considered curation and does all the hard work of overseas acquisition in the background.",
  },
  {
    name: "Ryan Delk",
    handle: "@delk",
    tag: "Tech Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Don't take it from me: @formaestate is magic. They unlocked an off-market cliffside estate in Mallorca that wasn't visible anywhere else.",
  },
  {
    name: "Demetria Giles",
    handle: "@drosewritings",
    tag: "Design Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Playing around with @formaestate portfolio has been incredible. Details, floorplans, light studies, and sound architectural advice. A design lover's dream come true.",
  },
  {
    name: "Jeremy McPeak",
    handle: "@jwmcpeak",
    tag: "Puglia Masseria",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    text: "I just completed our acquisition with @formaestate, and honestly wow! It is exceptionally well thought out, and I can see this being my advisory platform going forward.",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "@linuz90",
    tag: "Product Lead",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200&q=80",
    text: "I'm keeping @formaestate open *all* the time. Looking for both architectural inspiration and long-term retreats. It's rare to see a real estate platform execute so well.",
  },
  {
    name: "Jonathan Simcoe",
    handle: "@jdsimcoe",
    tag: "Architect",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80",
    text: "All righty. I have to give a massive shoutout to @formaestate for pioneering this standard. Speed, focus, and attention to architectural details is superb.",
  },
  {
    name: "Camille Laurent",
    handle: "@claurent_arch",
    tag: "Riviera Retreat",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Cross-border purchases are usually fraught with obscurity. With @formaestate, every legal step and structural analysis was crystal clear.",
  },
  {
    name: "Marcus Vance",
    handle: "@vance_marcus",
    tag: "Private Collector",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    text: "The Alentejo villa we acquired via @formaestate feels like a true sanctuary. Their local specialists made the entire escrow and handover feel effortless.",
  },
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [destination, setDestination] = useState(destinations[0]);
  const [searchIntent, setSearchIntent] = useState<"buy" | "rent">("buy");
  const [propertyType, setPropertyType] = useState("Any property");
  const [location, setLocation] = useState("Any destination");
  const [budget, setBudget] = useState("Any budget");
  const [bedrooms, setBedrooms] = useState("Any bedrooms");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesType = propertyType === "Any property" || property.type === propertyType;
      const matchesLocation = location === "Any destination" || property.place.includes(location);
      const matchesBedrooms = bedrooms === "Any bedrooms" || property.beds >= Number(bedrooms);
      return matchesType && matchesLocation && matchesBedrooms;
    });
  }, [bedrooms, location, propertyType]);

  function submitPropertySearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay was prevented by browser policy
        });
      }
    };

    playVideo();

    // Secondary guarantee: start playing as soon as user touches or scrolls
    const onUserGesture = () => {
      playVideo();
      window.removeEventListener("scroll", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("click", onUserGesture);
    };

    window.addEventListener("scroll", onUserGesture, { passive: true, once: true });
    window.addEventListener("touchstart", onUserGesture, { passive: true, once: true });
    window.addEventListener("click", onUserGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("click", onUserGesture);
    };
  }, []);

  return (
    <main>
      <Navbar />
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
        >
          <source src="/hero_faststart.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Curated international real estate</p>
          <h1>Exceptional properties.<br /><em>Extraordinary possibilities.</em></h1>
          <p className="hero-intro">A more considered way to find your place in the world. We connect discerning buyers with residences of lasting character.</p>
          <div className="hero-actions"><a className="button button-light" href="#collection">Explore the collection <span>↗</span></a><a className="text-link light" href="#contact">Arrange a private consultation <span>↗</span></a></div>
        </div>
        <form className="hero-search" onSubmit={submitPropertySearch} aria-label="Find a property">
          <div className="hero-search-intent" role="group" aria-label="Search intent">
            <button type="button" className={searchIntent === "buy" ? "active" : ""} onClick={() => setSearchIntent("buy")}>Buy</button>
            <button type="button" className={searchIntent === "rent" ? "active" : ""} onClick={() => setSearchIntent("rent")}>Rent</button>
          </div>
          <label className="hero-search-field">
            <span>Property type</span>
            <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} aria-label="Property type">
              <option>Any property</option>
              <option>Villa</option>
              <option>Residence</option>
              <option>Estate</option>
            </select>
            <ChevronDown aria-hidden="true" />
          </label>
          <label className="hero-search-field hero-search-location">
            <span>City or area</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="City or area">
              <option>Any destination</option>
              <option>Portugal</option>
              <option>Spain</option>
              <option>Italy</option>
            </select>
            <ChevronDown aria-hidden="true" />
          </label>
          <button className={`hero-filter-toggle ${advancedFiltersOpen ? "active" : ""}`} type="button" onClick={() => setAdvancedFiltersOpen((isOpen) => !isOpen)} aria-expanded={advancedFiltersOpen}>
            <SlidersHorizontal aria-hidden="true" />
            <span>Filters</span>
          </button>
          <button className="hero-search-submit" type="submit"><Search aria-hidden="true" /><span>Search</span></button>
          {advancedFiltersOpen && (
            <div className="hero-advanced-filters">
              <label className="hero-advanced-field">
                <span>Budget</span>
                <select value={budget} onChange={(event) => setBudget(event.target.value)}>
                  <option>Any budget</option>
                  <option>Under €1m</option>
                  <option>€1m – €2m</option>
                  <option>€2m+</option>
                </select>
              </label>
              <label className="hero-advanced-field">
                <span>Bedrooms</span>
                <select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>
                  <option>Any bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </label>
              <p>{budget === "Any budget" ? "Refine your search with considered details." : `Showing homes ${budget.toLowerCase()}.`}</p>
            </div>
          )}
        </form>
        <div className="scroll-cue"><span className="scroll-line" /> Scroll to discover</div>
      </section>

      <section className="intro section-pad">
        <div><p className="eyebrow dark">Our point of view</p><h2>More than a property.<br /><em>A place to belong.</em></h2></div>
        <div className="intro-note"><p>Every home has a sense of place. We look beyond the floorplan to find the light, landscape and local rhythm that make a property feel like yours.</p><a className="text-link" href="#approach">Discover our approach <span>↗</span></a></div>
      </section>

      <ScrollExpandMedia eyebrow="01 / A sense of place" title="The art of arriving." description="Spaces shaped by their surroundings, selected for the way they make everyday life feel." location="Alentejo coast, Portugal" mediaSrc={properties[0].image} bgImageSrc="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85" />

      <section className="collection section-pad" id="collection">
        <div className="section-heading"><div><p className="eyebrow dark">The collection</p><h2>Selected with<br /><em>intention.</em></h2></div><p className="section-lead">A small, evolving collection of distinctive homes in places worth knowing.</p></div>
        {filteredProperties.length > 0 ? <div className="property-grid">{filteredProperties.map((property, index) => <article className={`property-card card-${index}`} key={property.name}><div className="property-image"><img src={property.image} alt={`${property.name}, ${property.place}`} /><span className="card-index">0{index + 1}</span><a className="discover" href="#contact">Discover property <span>↗</span></a></div><div className="property-meta"><div><h3>{property.name}</h3><p>{property.place}</p></div><div className="property-stats"><span>{property.type}</span><span>{property.beds} beds</span><span>{property.area}</span></div><strong>{property.price}</strong></div></article>)}</div> : <p className="property-empty">No homes match these details yet. Try widening your search or <a href="#contact">speak with our team</a>.</p>}
        <a className="outline-button" href="#why-us">Why work with us <span>↗</span></a>
      </section>

      <section className="showcase dark-section section-pad" id="showcase">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curated Showcase</p>
            <h2>Architectural<br /><em>perspectives.</em></h2>
          </div>
          <p className="section-lead">
            An interactive 3D exploration of our private portfolio. Drag, flick, or use keyboard arrows to glide through residences of lasting character.
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
          label="Architectural Showcase 3D Coverflow"
        />
      </section>

      <WhyWorkWithUs />


      <section className="destinations section-pad" id="approach"><div className="section-heading"><div><p className="eyebrow dark">Places to begin</p><h2>Beyond the<br /><em>coordinates.</em></h2></div><p className="section-lead">We work with a growing network of local specialists and know the value of looking at a place from every angle.</p></div><div className="destination-layout"><div className="destination-photo"><img src={destination[2]} alt={destination[0]} /></div><div className="destination-copy"><p className="destination-number">0{destinations.findIndex((item) => item[0] === destination[0]) + 1} / 03</p><h3>{destination[0]}</h3><p>{destination[1]}</p>{destinations.map((item) => <button className={destination[0] === item[0] ? "active" : ""} key={item[0]} onClick={() => setDestination(item)}>{item[0]} <span>↗</span></button>)}</div></div></section>

      <section className="journey dark-section section-pad"><div className="section-heading"><div><p className="eyebrow">The journey</p><h2>Considered at<br /><em>every step.</em></h2></div><p className="section-lead">Buying internationally should feel exciting, never opaque. We stay close from first conversation to final key.</p></div><div className="steps">{["Tell us what you are looking for.", "Explore a considered shortlist.", "Arrange in-person or remote viewings.", "Review the process with local professionals.", "Move forward with clarity."].map((step, index) => <div className="step" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div></section>

      <section className="testimonials-section dark-section" id="testimonials">
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
          testimonials={testimonials}
          speed={45}
          pauseOnHover={true}
        />
      </section>

      <section className="contact section-pad" id="contact"><div className="contact-copy"><p className="eyebrow dark">Start a conversation</p><h2>Your next chapter<br /><em>begins here.</em></h2><p>Share a little about what you are looking for. We will come back to you personally within two working days.</p></div><form onSubmit={submitInquiry}>{sent ? <div className="success"><span>✓</span><h3>Thank you for reaching out.</h3><p>Your enquiry is ready for our team. We will be in touch shortly.</p></div> : <><div className="form-row"><label>Full name<input required name="name" /></label><label>Email address<input required type="email" name="email" /></label></div><div className="form-row"><label>Country of residence<input name="country" /></label><label>Preferred destination<select name="destination"><option>Portugal</option><option>Italy</option><option>Spain</option><option>Not sure yet</option></select></label></div><label>Tell us what you are looking for<textarea required name="message" rows={4} /></label><button className="button button-dark" type="submit">Send enquiry <span>↗</span></button><small>This form is a frontend enquiry point. Connect it to your CRM or email service before launch.</small></>}</form></section>

      <Footer />
    </main>
  );
}
