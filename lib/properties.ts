/**
 * Demo property data — Sri Lankan market showcase.
 *
 * ⚠ DEMO CONTENT ONLY
 * All listings are illustrative sample data. No real agency, owner, legal
 * status, price, or availability is represented. Replace with real MLS /
 * CMS data before going live.
 */

export type TransactionType = "sale" | "rent";

export type PropertyCategory =
  | "House"
  | "Villa"
  | "Apartment"
  | "Land"
  | "Commercial"
  | "Annex";

export interface Property {
  slug: string;
  name: string;
  /** Short location shown on cards */
  location: string;
  /** Full district / region */
  district: string;
  category: PropertyCategory;
  transaction: TransactionType;
  /** Price in LKR. For rent this is monthly. */
  priceValue: number;
  /** Pre-formatted display string */
  priceDisplay: string;
  beds?: number;
  baths?: number;
  /** Floor area in sq ft (omit for land) */
  areaSqFt?: number;
  /** Land size in perches (omit for apartments) */
  landPerches?: number;
  /** Land size in acres (alternative to perches for large plots) */
  landAcres?: number;
  /** Hero / cover image URL */
  image: string;
  /** Additional gallery images */
  gallery?: string[];
  description: string;
  amenities: string[];
  badge?: string;
  /** false = available, true = under offer / rented */
  underOffer?: boolean;
  /** ISO date string used for "recently added" sort */
  addedAt: string;
  /** Always true — signals demo content in UI */
  demo: true;
}

/** Format LKR amounts with Sri Lankan locale */
export function formatLKR(amount: number, isRent = false): string {
  const formatted = new Intl.NumberFormat("si-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(amount);
  return isRent ? `${formatted} / mo` : formatted;
}

export const PROPERTIES: Property[] = [
  {
    slug: "cinnamon-hill-residence-colombo-7",
    name: "Cinnamon Hill Residence",
    location: "Colombo 07",
    district: "Colombo",
    category: "House",
    transaction: "sale",
    priceValue: 95_000_000,
    priceDisplay: "LKR 95,000,000",
    beds: 5,
    baths: 4,
    areaSqFt: 4_200,
    landPerches: 20,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A substantial two-storey family home set on a quiet tree-lined road in the heart of Colombo 7. Recently refurbished throughout, the property retains its colonial character while offering modern comforts. High ceilings, polished terrazzo floors, and generous verandas on both levels create a living environment of rare quality.",
    amenities: [
      "Covered car park (3 vehicles)",
      "Solar water heater",
      "Backup generator",
      "Fully fitted kitchen",
      "Staff quarters",
      "Landscaped garden",
      "Bore well",
    ],
    badge: "Prime Location",
    addedAt: "2026-10-10T00:00:00Z",
    demo: true,
  },
  {
    slug: "ocean-view-villa-negombo",
    name: "Ocean View Villa",
    location: "Negombo",
    district: "Gampaha",
    category: "Villa",
    transaction: "sale",
    priceValue: 68_000_000,
    priceDisplay: "LKR 68,000,000",
    beds: 4,
    baths: 3,
    areaSqFt: 3_100,
    landPerches: 28,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A beautifully positioned coastal villa within 300 m of Negombo beach. Designed to capture sea breezes through a central courtyard, the property flows seamlessly between indoor and outdoor living. Mature palms frame the swimming pool and sundeck.",
    amenities: [
      "Swimming pool",
      "Covered outdoor lounge",
      "Solar panels",
      "Home theatre room",
      "Backup generator",
      "Security system",
      "Landscaped garden",
    ],
    badge: "Sea View",
    addedAt: "2026-10-14T00:00:00Z",
    demo: true,
  },
  {
    slug: "temple-road-apartment-kandy",
    name: "Temple Road Apartment",
    location: "Kandy",
    district: "Kandy",
    category: "Apartment",
    transaction: "sale",
    priceValue: 28_500_000,
    priceDisplay: "LKR 28,500,000",
    beds: 3,
    baths: 2,
    areaSqFt: 1_450,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A spacious apartment on the 6th floor of a well-maintained complex in central Kandy, with partial views of the Kandy Lake. Walking distance to the Temple of the Tooth and the city's cultural quarter. Includes two secure car-parking bays.",
    amenities: [
      "Secured underground parking (×2)",
      "24-hour security",
      "Lift access",
      "Backup generator",
      "Intercom system",
      "Rooftop terrace (common)",
    ],
    badge: "City Centre",
    addedAt: "2026-10-05T00:00:00Z",
    demo: true,
  },
  {
    slug: "galle-fort-townhouse",
    name: "Galle Fort Townhouse",
    location: "Galle Fort",
    district: "Galle",
    category: "House",
    transaction: "sale",
    priceValue: 55_000_000,
    priceDisplay: "LKR 55,000,000",
    beds: 3,
    baths: 3,
    areaSqFt: 2_800,
    landPerches: 12,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A characterful Dutch-period townhouse within the UNESCO World Heritage Galle Fort. Meticulously restored, the property combines original lime-plastered walls and antique timber with discreet contemporary fittings. A rare opportunity in one of Sri Lanka's most coveted addresses.",
    amenities: [
      "Rooftop terrace with ocean views",
      "Restored original flooring",
      "Courtyard garden",
      "Air conditioning throughout",
      "Architect-designed kitchen",
    ],
    badge: "Heritage",
    addedAt: "2026-09-28T00:00:00Z",
    demo: true,
  },
  {
    slug: "matara-beachside-land",
    name: "Matara Beachside Land",
    location: "Matara",
    district: "Matara",
    category: "Land",
    transaction: "sale",
    priceValue: 12_500_000,
    priceDisplay: "LKR 12,500,000",
    landPerches: 40,
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A cleared 40-perch beachside plot approximately 80 m from the Indian Ocean shoreline in Matara. Suitable for residential or boutique hospitality development (subject to planning consent). Deed title, road access confirmed.",
    amenities: [
      "Clear deed title (demo — verify)",
      "Direct road frontage",
      "Electricity at boundary",
      "Water connection available",
    ],
    badge: "Beachside",
    addedAt: "2026-10-18T00:00:00Z",
    demo: true,
  },
  {
    slug: "rajagiriya-sky-penthouse",
    name: "Rajagiriya Sky Penthouse",
    location: "Rajagiriya",
    district: "Colombo",
    category: "Apartment",
    transaction: "sale",
    priceValue: 48_000_000,
    priceDisplay: "LKR 48,000,000",
    beds: 3,
    baths: 3,
    areaSqFt: 2_100,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A top-floor penthouse with panoramic views over the Diyawanna Oya wetlands and the Colombo skyline. Double-height living room, private rooftop terrace, and bespoke joinery throughout. Located within a full-amenity building minutes from the Sri Jayawardenepura business district.",
    amenities: [
      "Private rooftop terrace",
      "Double-height living room",
      "Gym & swimming pool (building)",
      "Concierge service",
      "3 secure parking bays",
      "Smart home system",
    ],
    badge: "Penthouse",
    addedAt: "2026-10-12T00:00:00Z",
    demo: true,
  },
  {
    slug: "nugegoda-commercial-space",
    name: "Nugegoda Commercial Space",
    location: "Nugegoda",
    district: "Colombo",
    category: "Commercial",
    transaction: "sale",
    priceValue: 85_000_000,
    priceDisplay: "LKR 85,000,000",
    areaSqFt: 6_500,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A freehold ground-floor commercial property on a high-footfall thoroughfare in Nugegoda. Currently configured as open-plan retail with a mezzanine office level and rear loading bay. Suitable for banking, retail anchor, showroom, or mixed-use conversion.",
    amenities: [
      "Ground + mezzanine levels",
      "Rear loading bay",
      "10 car-park spaces",
      "3-phase power supply",
      "Broadband conduit installed",
    ],
    badge: "Commercial",
    addedAt: "2026-09-15T00:00:00Z",
    demo: true,
  },
  {
    slug: "wellawatte-sea-facing-annex",
    name: "Wellawatte Sea-Facing Annex",
    location: "Wellawatte",
    district: "Colombo",
    category: "Annex",
    transaction: "rent",
    priceValue: 75_000,
    priceDisplay: "LKR 75,000 / mo",
    beds: 2,
    baths: 1,
    areaSqFt: 900,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A bright, self-contained upper-floor annex with partial sea views across the Wellawatte canal and Indian Ocean. Fully furnished, independent entrance, and metered electricity. Suitable for a couple or single professional seeking a premium rental near central Colombo.",
    amenities: [
      "Fully furnished",
      "Independent entrance",
      "Sea-facing balcony",
      "Air conditioning",
      "Metered utilities",
      "1 parking space",
    ],
    badge: "Available Now",
    addedAt: "2026-10-19T00:00:00Z",
    demo: true,
  },
  {
    slug: "dehiwala-garden-villa-rental",
    name: "Dehiwala Garden Villa",
    location: "Dehiwala",
    district: "Colombo",
    category: "Villa",
    transaction: "rent",
    priceValue: 250_000,
    priceDisplay: "LKR 250,000 / mo",
    beds: 5,
    baths: 4,
    areaSqFt: 4_800,
    landPerches: 35,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A spacious family villa on a mature, garden-heavy plot in residential Dehiwala. Five bedrooms across two floors, a private pool, and a dedicated home-office suite. Available unfurnished or partly furnished by negotiation. Minimum 12-month lease.",
    amenities: [
      "Private swimming pool",
      "Home-office suite",
      "Staff quarters",
      "5-car covered parking",
      "Solar panels",
      "Bore well & water storage",
      "CCTV & alarm system",
    ],
    badge: "Premium Rental",
    addedAt: "2026-10-08T00:00:00Z",
    demo: true,
  },
  {
    slug: "mount-lavinia-beachfront-plot",
    name: "Mount Lavinia Beachfront Plot",
    location: "Mount Lavinia",
    district: "Colombo",
    category: "Land",
    transaction: "sale",
    priceValue: 22_000_000,
    priceDisplay: "LKR 22,000,000",
    landPerches: 18,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "An 18-perch residential plot with direct beach frontage in Mount Lavinia. Services connected. Ideal for a bespoke single-family residence or boutique holiday retreat. Surveyed and ready for planning submission.",
    amenities: [
      "Direct beach frontage",
      "Surveyed (demo — verify)",
      "Electricity at boundary",
      "Water supply available",
      "Road frontage",
    ],
    badge: "Beachfront",
    addedAt: "2026-10-16T00:00:00Z",
    demo: true,
  },
  {
    slug: "havelock-town-luxury-apartment",
    name: "Havelock Town Luxury Apartment",
    location: "Colombo 05",
    district: "Colombo",
    category: "Apartment",
    transaction: "sale",
    priceValue: 37_500_000,
    priceDisplay: "LKR 37,500,000",
    beds: 3,
    baths: 2,
    areaSqFt: 1_750,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A well-appointed apartment in a sought-after Havelock Town development. South-facing aspect with large windows and a wrap-around balcony. Building amenities include a rooftop infinity pool, gym, and 24-hour security. Walking distance to Havelock City Mall.",
    amenities: [
      "Rooftop infinity pool",
      "Fully-equipped gym",
      "24-hour security & concierge",
      "2 secure parking bays",
      "EV charging point",
      "Fibre broadband ready",
    ],
    badge: "New Completion",
    addedAt: "2026-10-20T00:00:00Z",
    demo: true,
  },
  {
    slug: "negombo-lagoon-view-house",
    name: "Negombo Lagoon-View House",
    location: "Negombo",
    district: "Gampaha",
    category: "House",
    transaction: "sale",
    priceValue: 45_000_000,
    priceDisplay: "LKR 45,000,000",
    beds: 4,
    baths: 3,
    areaSqFt: 2_900,
    landPerches: 22,
    image:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    ],
    description:
      "A contemporary family home overlooking Negombo Lagoon. Open-plan ground floor with full-width sliding doors opening to a covered terrace and private garden. Upper floor features four bedrooms, all with en-suite bathrooms and built-in wardrobes.",
    amenities: [
      "Lagoon views from upper floor",
      "Covered terrace",
      "Landscaped garden",
      "Backup generator",
      "Solar water heating",
      "Domestic bore well",
      "Double garage",
    ],
    badge: "Lagoon View",
    addedAt: "2026-10-17T00:00:00Z",
    demo: true,
  },
];

/** All unique district names for the location filter */
export const DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kandy",
  "Galle",
  "Matara",
] as const;

/** All unique cities/areas for the location filter */
export const LOCATIONS = Array.from(
  new Set(PROPERTIES.map((p) => p.location))
).sort();

export const CATEGORIES: PropertyCategory[] = [
  "House",
  "Villa",
  "Apartment",
  "Land",
  "Commercial",
  "Annex",
];

/** Retrieve a property by slug; returns undefined if not found */
export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

/** Get related properties (same category or district, excluding self) */
export function getRelatedProperties(property: Property, limit = 3): Property[] {
  return PROPERTIES.filter(
    (p) =>
      p.slug !== property.slug &&
      (p.category === property.category || p.district === property.district)
  ).slice(0, limit);
}

