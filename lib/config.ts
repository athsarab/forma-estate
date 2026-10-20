/**
 * Agency configuration — update these values before deploying for a client.
 * Keep secrets (API keys, CRM tokens) in environment variables, never here.
 */
export const AGENCY_CONFIG = {
  /** Agency display name shown in UI copy */
  name: "Forma Estate",
  /** Production domain — used for canonical URLs and OG tags */
  domain: "https://forma-estate.vercel.app",
  /**
   * WhatsApp number in international format, digits only.
   * Replace with the agency's real number before launch.
   * Example: Sri Lanka mobile  +94 71 234 5678  →  "94712345678"
   */
  whatsappNumber: "94712345678",
  /** Display phone — shown in UI */
  phone: "+94 71 234 5678",
  /** Primary enquiry email */
  email: "enquiries@forma-estate.lk",
  /** Social links — set to "" to hide */
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "",
  },
} as const;

/** Build a WhatsApp chat URL for a specific property */
export function buildWhatsAppUrl(
  propertyTitle: string,
  propertySlug: string
): string {
  const url = `${AGENCY_CONFIG.domain}/properties/${propertySlug}`;
  const msg = `Hi, I'm interested in the property: ${propertyTitle}\n${url}`;
  return `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

