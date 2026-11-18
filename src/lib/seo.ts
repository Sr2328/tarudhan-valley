/**
 * Central SEO configuration for Tarudhan Valley.
 * One place for titles, descriptions, keywords, canonical URL, meta tags and JSON-LD.
 *
 * SETUP: set VITE_SITE_URL in .env (e.g. VITE_SITE_URL=https://www.your-real-domain.com).
 * A wrong canonical URL tells Google to ignore the page, so do this before launch.
 */
import { amenities, faqItems, projectFacts } from "@/lib/tarudhan-data";

const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;

export const SITE_URL = (env?.VITE_SITE_URL ?? "https://your-domain.com").replace(/\/$/, "");
export const SITE_NAME = "Tarudhan Valley Golf Resort";

export const SEO = {
  // ≤ ~60 characters so it is not truncated in results
  title: "Tarudhan Valley Golf Villas, Manesar | 65-Acre Gated Community",
  // ≤ ~155 characters
  description:
    "Ready-to-move studios and 2 & 3 BHK golf villas at Tarudhan Valley, a 65-acre gated community in Manesar, Gurugram, with a 9-hole course by Graham Cooke.",
  ogTitle: "Tarudhan Valley Golf Resort — Where Golf Meets Greenery",
  ogDescription:
    "A completed 65-acre gated golf community in Manesar, Gurugram: golf villas, studio apartments, clubhouse, spa and a nine-hole course by Graham Cooke.",
  image: `${SITE_URL}/images/tarudhan-og.jpg`,
  imageAlt: "Aerial view of fairways and residences at Tarudhan Valley Golf Resort, Manesar",
  locale: "en_IN",
  lang: "en-IN",
} as const;

/**
 * Keyword map. Search volumes are NOT included on purpose: validate every term in
 * Google Search Console / Keyword Planner before betting on it (see SEO-GUIDE.md).
 */
export const KEYWORDS = {
  primary: [
    "tarudhan valley",
    "tarudhan valley golf resort",
    "tarudhan valley manesar",
    "tarudhan valley villas",
    "tarudhan valley silverglades",
  ],
  commercial: [
    "golf villas in gurugram",
    "golf course villas manesar",
    "gated golf community gurugram",
    "ready to move villas manesar",
    "studio apartments manesar",
    "2 bhk villa manesar",
    "3 bhk villa manesar",
    "villas near manesar tauru road",
    "golf course residential delhi ncr",
  ],
  informational: [
    "9 hole golf course gurugram",
    "graham cooke golf course india",
    "golf resort near delhi",
    "weekend home near gurgaon",
    "second home near delhi ncr",
  ],
  local: ["manesar", "tauru", "dadu", "bissar akbarpur", "gurugram", "naurangpur tauru road"],
  hindi: ["तरुधन वैली", "गुरुग्राम गोल्फ विला", "मानेसर विला"],
} as const;

/** `keywords` meta is ignored by Google; harmless, kept for completeness. */
const metaKeywords = [...KEYWORDS.primary, ...KEYWORDS.commercial.slice(0, 5)].join(", ");

export function seoMeta() {
  return [
    { title: SEO.title },
    { name: "description", content: SEO.description },
    { name: "keywords", content: metaKeywords },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { name: "geo.region", content: "IN-HR" },
    { name: "geo.placename", content: "Manesar, Gurugram" },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SEO.locale },
    { property: "og:url", content: `${SITE_URL}/` },
    { property: "og:title", content: SEO.ogTitle },
    { property: "og:description", content: SEO.ogDescription },
    { property: "og:image", content: SEO.image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SEO.imageAlt },

    // Twitter / X
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SEO.ogTitle },
    { name: "twitter:description", content: SEO.ogDescription },
    { name: "twitter:image", content: SEO.image },
    { name: "twitter:image:alt", content: SEO.imageAlt },
  ];
}

export function seoLinks() {
  return [
    { rel: "canonical", href: `${SITE_URL}/` },
    { rel: "alternate", hrefLang: "en-IN", href: `${SITE_URL}/` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
    // The hero is a CSS background, so the browser can't discover it early. Preloading it
    // is the single biggest Largest-Contentful-Paint win on this page.
    {
      rel: "preload",
      as: "image",
      href: "/images/tarudhan-hero.webp",
      type: "image/webp",
      fetchPriority: "high",
    },
  ];
}

/**
 * JSON-LD graph. Deliberately NOT included:
 *  - Review / AggregateRating: the on-page reviews are placeholders. Marking up fake
 *    reviews violates Google's guidelines and can trigger a manual action.
 *  - geo coordinates: add `geo` after copying exact lat/long from Google Maps.
 */
export function buildJsonLd() {
  const url = `${SITE_URL}/`;
  const communityId = `${url}#community`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: SITE_NAME,
        inLanguage: SEO.lang,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: SEO.title,
        description: SEO.description,
        isPartOf: { "@id": `${url}#website` },
        about: { "@id": communityId },
        primaryImageOfPage: { "@type": "ImageObject", url: SEO.image, width: 1200, height: 630 },
        inLanguage: SEO.lang,
      },
      {
        "@type": "GatedResidenceCommunity",
        "@id": communityId,
        name: SITE_NAME,
        alternateName: ["Tarudhan Valley", "Tarudhan Valley Manesar"],
        description: SEO.ogDescription,
        url,
        image: SEO.image,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Village Dadu, Tarudhan Valley Golf Resort, Naurangpur–Tauru Road",
          addressLocality: "Bissar Akbarpur",
          addressRegion: "Haryana",
          postalCode: "122105",
          addressCountry: "IN",
        },
        areaServed: ["Manesar", "Gurugram", "Delhi NCR"],
        telephone: "+91-88820-12012",
        amenityFeature: amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a.title,
          value: true,
        })),
        containsPlace: {
          "@type": "GolfCourse",
          name: "Tarudhan Valley nine-hole golf course",
          description: `Nine-hole course designed by ${projectFacts.architect}.`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
}

/** Escape "<" so the JSON can't break out of its <script> tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}