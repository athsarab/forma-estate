import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROPERTIES, getPropertyBySlug, getRelatedProperties } from "@/lib/properties";
import { AGENCY_CONFIG, buildWhatsAppUrl } from "@/lib/config";
import PropertyDetailClient from "./PropertyDetailClient";

interface Props {
  params: { slug: string };
}

/** Pre-generate all property slugs at build time */
export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);
  if (!property) {
    return { title: "Property Not Found" };
  }

  const title = `${property.name} — ${property.category} ${property.transaction === "rent" ? "for Rent" : "for Sale"} in ${property.location}`;
  const description = `${property.priceDisplay} · ${property.beds ? `${property.beds} bed${property.beds > 1 ? "s" : ""} · ` : ""}${property.areaSqFt ? `${property.areaSqFt.toLocaleString()} sq ft · ` : ""}${property.description.slice(0, 120)}…`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: property.image, alt: property.name }],
      type: "website",
    },
    alternates: {
      canonical: `${AGENCY_CONFIG.domain}/properties/${property.slug}`,
    },
  };
}

export default function PropertyDetailPage({ params }: Props) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const related = getRelatedProperties(property, 3);
  const whatsappUrl = buildWhatsAppUrl(property.name, property.slug);

  return (
    <PropertyDetailClient
      property={property}
      related={related}
      whatsappUrl={whatsappUrl}
    />
  );
}

