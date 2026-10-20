"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bed,
  Bath,
  SquareCode,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Property } from "@/lib/properties";
import { AGENCY_CONFIG } from "@/lib/config";

interface Props {
  property: Property;
  related: Property[];
  whatsappUrl: string;
}

export default function PropertyDetailClient({
  property,
  related,
  whatsappUrl,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [viewingSubmitted, setViewingSubmitted] = useState(false);
  const [viewingSubmitting, setViewingSubmitting] = useState(false);

  const gallery = property.gallery ?? [property.image];

  function handleViewingRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (viewingSubmitting || viewingSubmitted) return;
    setViewingSubmitting(true);
    setTimeout(() => {
      setViewingSubmitted(true);
      setViewingSubmitting(false);
    }, 600);
  }

  return (
    <main>
      <Navbar />

      {/* ── Hero image gallery ──────────────────────────────────────────── */}
      <section className="pd-hero">
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <img
              src={gallery[activeImage]}
              alt={`${property.name} — photo ${activeImage + 1} of ${gallery.length}`}
              className="pd-main-img"
            />
            {property.badge && (
              <span className="pd-hero-badge">{property.badge}</span>
            )}
            {property.underOffer && (
              <div className="pd-under-offer">Under Offer</div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="pd-gallery-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pd-thumb ${i === activeImage ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <img src={src} alt={`${property.name} thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Property detail body ─────────────────────────────────────────── */}
      <div className="pd-body section-pad">
        {/* Back link */}
        <Link href="/#collection" className="pd-back">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to collection
        </Link>

        {/* Demo notice */}
        <div className="demo-notice" role="note" style={{ marginBottom: "2rem" }}>
          <span>⚠ Demo content</span> — This listing is illustrative sample
          data only. No real price, availability, or ownership is represented.
        </div>

        <div className="pd-layout">
          {/* ── Left: Details ─────────────────────────────────────────── */}
          <div className="pd-details">
            {/* Header */}
            <header className="pd-header">
              <div className="pd-breadcrumb">
                <span className={`tx-badge tx-${property.transaction}`}>
                  {property.transaction === "sale" ? "For Sale" : "For Rent"}
                </span>
                <span className="pd-category">{property.category}</span>
              </div>
              <h1 className="pd-title">{property.name}</h1>
              <p className="pd-location">
                <MapPin size={14} aria-hidden="true" />
                {property.location}, Sri Lanka
              </p>
              <p className="pd-price">{property.priceDisplay}</p>
            </header>

            {/* Specs */}
            <div className="pd-specs">
              {property.beds !== undefined && (
                <div className="pd-spec">
                  <Bed size={18} aria-hidden="true" />
                  <span>{property.beds} Bedrooms</span>
                </div>
              )}
              {property.baths !== undefined && (
                <div className="pd-spec">
                  <Bath size={18} aria-hidden="true" />
                  <span>{property.baths} Bathrooms</span>
                </div>
              )}
              {property.areaSqFt && (
                <div className="pd-spec">
                  <SquareCode size={18} aria-hidden="true" />
                  <span>{property.areaSqFt.toLocaleString()} sq ft</span>
                </div>
              )}
              {property.landPerches && (
                <div className="pd-spec">
                  <MapPin size={18} aria-hidden="true" />
                  <span>{property.landPerches} perches</span>
                </div>
              )}
              {property.landAcres && (
                <div className="pd-spec">
                  <MapPin size={18} aria-hidden="true" />
                  <span>{property.landAcres} acres</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="pd-section">
              <h2 className="pd-section-title">About this property</h2>
              <p className="pd-description">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="pd-section">
              <h2 className="pd-section-title">Amenities &amp; features</h2>
              <ul className="pd-amenities">
                {property.amenities.map((a) => (
                  <li key={a}>
                    <CheckCircle size={14} aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability status */}
            <div className="pd-section">
              <h2 className="pd-section-title">Availability</h2>
              <div className={`pd-availability ${property.underOffer ? "unavailable" : "available"}`}>
                {property.underOffer ? (
                  <>
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>Under Offer — enquire for updates</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Available — enquire to arrange a viewing</span>
                  </>
                )}
              </div>
            </div>

            {/* Viewing request form */}
            <div className="pd-section">
              <h2 className="pd-section-title">Request a viewing</h2>
              {viewingSubmitted ? (
                <div className="success pd-success">
                  <span>✓</span>
                  <h3>Viewing request received.</h3>
                  <p>We will contact you to confirm a time.</p>
                </div>
              ) : (
                <form className="pd-viewing-form" onSubmit={handleViewingRequest}>
                  <div className="form-row">
                    <label>
                      Name
                      <input required name="name" autoComplete="name" />
                    </label>
                    <label>
                      Phone or email
                      <input required name="contact" />
                    </label>
                  </div>
                  <label>
                    Preferred date / time (optional)
                    <input name="datetime" type="text" placeholder="e.g. Weekday afternoons" />
                  </label>
                  <button
                    type="submit"
                    className="button button-dark"
                    disabled={viewingSubmitting}
                  >
                    {viewingSubmitting ? "Sending…" : <>Request viewing <span>↗</span></>}
                  </button>
                  <small>
                    ⚠ Frontend demo only — no data is stored or transmitted.
                  </small>
                </form>
              )}
            </div>
          </div>

          {/* ── Right: Contact actions sidebar ────────────────────────── */}
          <aside className="pd-sidebar">
            <div className="pd-contact-card">
              <p className="pd-contact-label">Enquire about this property</p>
              <p className="pd-contact-name">Forma Estate</p>
              <p className="pd-contact-tagline">Sri Lanka Property Specialists</p>

              <div className="pd-contact-actions">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-action-btn pd-whatsapp"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${AGENCY_CONFIG.phone.replace(/\s/g, "")}`}
                  className="pd-action-btn pd-call"
                >
                  <Phone size={17} aria-hidden="true" />
                  Call
                </a>
                <a
                  href={`mailto:${AGENCY_CONFIG.email}?subject=Enquiry: ${encodeURIComponent(property.name)}`}
                  className="pd-action-btn pd-email"
                >
                  <Mail size={17} aria-hidden="true" />
                  Email
                </a>
                <a href="#" className="pd-action-btn pd-view" onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(".pd-viewing-form")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  <Eye size={17} aria-hidden="true" />
                  Request Viewing
                </a>
              </div>

              <div className="pd-contact-details">
                <p>{AGENCY_CONFIG.phone}</p>
                <p>{AGENCY_CONFIG.email}</p>
              </div>
            </div>

            {/* Property reference */}
            <div className="pd-ref-card">
              <p className="pd-ref-label">Property reference</p>
              <p className="pd-ref-slug">{property.slug}</p>
              <p className="pd-ref-demo">
                Demo listing — not a real property
              </p>
            </div>
          </aside>
        </div>

        {/* ── Related properties ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="pd-related">
            <h2 className="pd-section-title">You may also like</h2>
            <div className="property-grid">
              {related.map((rel, index) => (
                <article className={`property-card card-${index}`} key={rel.slug}>
                  <div className="property-image">
                    <img
                      src={rel.image}
                      alt={`${rel.name} — ${rel.category} in ${rel.location}`}
                      loading="lazy"
                    />
                    <span className="card-index">0{index + 1}</span>
                    <a className="discover" href={`/properties/${rel.slug}`}>
                      View property <span>↗</span>
                    </a>
                  </div>
                  <div className="property-meta">
                    <div>
                      <h3>{rel.name}</h3>
                      <p>{rel.location}, Sri Lanka</p>
                    </div>
                    <strong>{rel.priceDisplay}</strong>
                    <div className="property-stats">
                      <span>{rel.category}</span>
                      {rel.beds !== undefined && <span>{rel.beds} beds</span>}
                      {rel.areaSqFt && <span>{rel.areaSqFt.toLocaleString()} sq ft</span>}
                      <span className={`tx-badge tx-${rel.transaction}`}>
                        {rel.transaction === "sale" ? "For Sale" : "For Rent"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

