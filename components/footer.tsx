"use client";

import * as React from "react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.888 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.307 0 .604.05.88.142V9.45a6.335 6.335 0 0 0-.88-.063A6.336 6.336 0 0 0 3 15.723 6.336 6.336 0 0 0 9.336 22a6.336 6.336 0 0 0 6.336-6.336V8.65a8.212 8.212 0 0 0 4.908 1.602V6.807a4.83 4.83 0 0 1-1-.121z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.095.143-1.393.44-.34.339-.427.865-.427 1.821v1.719h4.316l-.582 3.667H14.3v7.98H9.101z" />
    </svg>
  );
}

function ArrowUpIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="forma-footer-wrapper">
      <div className="forma-footer-capsule">
        {/* Top Info Columns matching reference image layout */}
        <div className="forma-footer-columns">
          {/* Left Column: Headline & Copyright */}
          <div className="footer-headline-col">
            <h2 className="footer-headline">
              Exceptional property across<br />
              Sri Lanka — curated with care.
            </h2>
            <p className="footer-sub-copyright">
              © {new Date().getFullYear()} Forma Estate Sri Lanka ·{" "}
              <em>Demo showcase — not a real agency</em>
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-nav-column">
            <span className="footer-column-heading">Navigation</span>
            <ul className="footer-nav-links">
              <li><a href="#collection">Collection</a></li>
              <li><a href="#showcase">3D Showcase</a></li>
              <li><a href="/#approach">Our Approach</a></li>
              <li><a href="#testimonials">Perspectives</a></li>
            </ul>
          </div>

          {/* Advisory / Support Column */}
          <div className="footer-nav-column">
            <span className="footer-column-heading">Support</span>
            <ul className="footer-nav-links">
              <li><a href="/#contact">Contact Us</a></li>
              <li><a href="/#approach">Buying Guide</a></li>
              <li><a href="/#approach">Rental Guide</a></li>
              <li><a href="/#contact">Privacy Policy</a></li>
              <li><a href="/#approach">Legal Notice</a></li>
            </ul>
          </div>

          {/* Right Column: Newsletter & Socials */}
          <div className="footer-action-column">
            <span className="footer-column-heading">Get updates from Forma.</span>

            {subscribed ? (
              <div className="footer-subscribed-pill">
                <span>✓</span> Subscribed to private dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-input-pill">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-email-field"
                  aria-label="Email Address"
                />
                <button type="submit" className="footer-subscribe-action-btn">
                  Subscribe
                </button>
              </form>
            )}

            <div className="footer-follow-block">
              <span className="footer-column-heading footer-follow-heading">Follow Us</span>
              <div className="footer-social-row">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="footer-social-circle"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="footer-social-circle"
                >
                  <TikTokIcon />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="footer-social-circle"
                >
                  <FacebookIcon />
                </a>
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                  className="footer-social-circle footer-top-circle"
                  title="Scroll to top"
                >
                  <ArrowUpIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Bottom Wordmark: "forma" matching "watts" exactly */}
        <div className="forma-footer-wordmark-wrap">
          <span className="forma-footer-wordmark">forma</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
