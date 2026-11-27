/**
 * Residence detail data.
 * Sizes are the rough figures supplied by the client; confirm with the developer before launch.
 * Community-wide facts (65 acres, 141 units, amenities) come from the developer's project page.
 */

export type SpecIcon = "style" | "size" | "plot" | "type" | "units" | "status" | "price";

export type Residence = {
  slug: "orchard-homes" | "golf-villas" | "studio-apartments";
  title: string;
  /** one line shown on the About cards */
  cardLine: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imagePos: string;
  imageAlt: string;
  summary: string[]; // chips in the hero
  specs: { icon: SpecIcon; label: string; value: string }[];
  variants?: { name: string; builtUp: string; plot: string }[];
  description: string[];
  highlights: string[];
  gallery: { src: string; alt: string; pos: string }[];
};

/** Facilities shared by every home type (as listed by the developer / operator). */
const communityHighlights = [
  "Nine-hole golf course by Graham Cooke",
  "Golf driving range",
  "Clubhouse",
  "Swimming pool",
  "Tatva Spa, sauna and steam",
  "Restaurant and bar",
  "Sports facilities: tennis, squash, badminton, billiards and more",
  "Conference and banquet lawns",
  "Resort hotel operated by Lemon Tree Hotels",
  "Gated, landscaped 65-acre community",
];

const communityUnits = { icon: "units" as const, label: "Units in the community", value: "141, across all home types" };
const status = { icon: "status" as const, label: "Status", value: "Completed, ready to move" };
const price = { icon: "price" as const, label: "Price", value: "On request" };

export const residences: Residence[] = [
  {
    slug: "orchard-homes",
    title: "Orchard Homes",
    cardLine: "Bali style · 3,500 sq ft",
    tagline: "Bali-style homes with generous space, set among the greens of Tarudhan Valley.",
    seoTitle: "Orchard Homes at Tarudhan Valley, Manesar | Bali-Style, 3,500 sq ft",
    seoDescription:
      "Bali-style Orchard Homes of about 3,500 sq ft at Tarudhan Valley Golf Resort, Manesar, Gurugram. See size, land area and details, then call or WhatsApp the sales team.",
    image: "/images/tarudhan-hero.webp",
    imagePos: "62% 55%",
    imageAlt: "Illustrative view of homes set among trees at Tarudhan Valley",
    summary: ["Bali style", "3,500 sq ft", "Ready to move"],
    specs: [
      { icon: "style", label: "Style", value: "Bali style" },
      { icon: "size", label: "Property size", value: "3,500 sq ft" },
      // CONFIRM: 3,500 sq ft built on a 1,000 sq ft plot is unusual. This may be 1,000 sq yards.
      { icon: "plot", label: "Land size", value: "1,000 sq ft" },
      communityUnits,
      status,
      price,
    ],
    description: [
      "Orchard Homes bring a Bali-inspired style to Tarudhan Valley, with around 3,500 sq ft of space for family living, hosting and quiet weekends away from the city.",
      "They sit inside the valley's 65-acre gated community, so the course, clubhouse, pool and spa are part of everyday life. The developer also lists Balinese-style wooden cottages among the valley's home options.",
    ],
    highlights: communityHighlights,
    gallery: [
      { src: "/images/tarudhan-hero.webp", alt: "Illustrative aerial view of the Tarudhan Valley community", pos: "62% 55%" },
      { src: "/images/tarudhan-villa.webp", alt: "Illustrative view of a home terrace", pos: "75% 60%" },
      { src: "/images/tarudhan-course.webp", alt: "Illustrative view of the golf course", pos: "30% 50%" },
      { src: "/images/tarudhan-pool.webp", alt: "Illustrative view of the pool and leisure area", pos: "center" },
    ],
  },
  {
    slug: "golf-villas",
    title: "Golf Villas",
    cardLine: "2 & 3 BHK · 2,600–3,200 sq ft",
    tagline: "Independent 2 and 3 BHK villas beside the nine-hole course.",
    seoTitle: "Golf Villas at Tarudhan Valley, Manesar | 2 & 3 BHK, up to 3,200 sq ft",
    seoDescription:
      "2 BHK (2,600 sq ft, 250 sq yd plot) and 3 BHK (3,200 sq ft, 350 sq yd plot) golf villas at Tarudhan Valley Golf Resort, Manesar, Gurugram. Call or WhatsApp for details.",
    image: "/images/tarudhan-villa.webp",
    imagePos: "center",
    imageAlt: "Illustrative view of a golf villa at Tarudhan Valley",
    summary: ["2 & 3 BHK", "2,600–3,200 sq ft", "Ready to move"],
    specs: [
      { icon: "type", label: "Types", value: "2 BHK and 3 BHK villas" },
      { icon: "size", label: "Property size", value: "2,600 to 3,200 sq ft" },
      { icon: "plot", label: "Plot size", value: "250 to 350 sq yards" },
      communityUnits,
      status,
      price,
    ],
    variants: [
      { name: "2 BHK villa", builtUp: "2,600 sq ft", plot: "250 sq yards" },
      { name: "3 BHK villa", builtUp: "3,200 sq ft", plot: "350 sq yards" },
    ],
    description: [
      "Golf Villas are independent homes with generous built-up space and their own plots, offered as 2 BHK and 3 BHK layouts.",
      "Living here means the nine-hole course, driving range, clubhouse and resort facilities are minutes from your door, in a gated, landscaped community in Manesar.",
    ],
    highlights: communityHighlights,
    gallery: [
      { src: "/images/tarudhan-villa.webp", alt: "Illustrative view of a golf villa", pos: "center" },
      { src: "/images/tarudhan-course.webp", alt: "Illustrative view across the golf course", pos: "center" },
      { src: "/images/tarudhan-hero.webp", alt: "Illustrative aerial view of the villas and fairways", pos: "70% 50%" },
      { src: "/images/tarudhan-pool.webp", alt: "Illustrative view of the pool", pos: "40% 60%" },
    ],
  },
  {
    slug: "studio-apartments",
    title: "Studio Apartments",
    cardLine: "950–1,100 sq ft",
    tagline: "Easy, compact living with the whole valley's amenities on your doorstep.",
    seoTitle: "Studio Apartments at Tarudhan Valley, Manesar | 950 to 1,100 sq ft",
    seoDescription:
      "Studio apartments of 950 to 1,100 sq ft at Tarudhan Valley Golf Resort, Manesar, Gurugram, inside a gated golf community. Call or WhatsApp for details.",
    image: "/images/tarudhan-pool.webp",
    imagePos: "center",
    imageAlt: "Illustrative view of the pool near the studio apartments at Tarudhan Valley",
    summary: ["Studio", "950–1,100 sq ft", "Ready to move"],
    specs: [
      { icon: "type", label: "Type", value: "Studio apartment" },
      { icon: "size", label: "Property size", value: "950 to 1,100 sq ft" },
      communityUnits,
      status,
      price,
    ],
    description: [
      "Studio Apartments are the most compact way to own a home in Tarudhan Valley, with roughly 950 to 1,100 sq ft of space.",
      "You still get the full community: golf, clubhouse, pool, spa, dining and sports, all inside a gated, green setting in Manesar.",
    ],
    highlights: communityHighlights,
    gallery: [
      { src: "/images/tarudhan-pool.webp", alt: "Illustrative view of the pool and leisure area", pos: "center" },
      { src: "/images/tarudhan-hero.webp", alt: "Illustrative aerial view of the community", pos: "20% 60%" },
      { src: "/images/tarudhan-course.webp", alt: "Illustrative view of the golf course", pos: "center" },
      { src: "/images/tarudhan-villa.webp", alt: "Illustrative view of a villa terrace", pos: "75% 60%" },
    ],
  },
];

export const getResidence = (slug: string) => residences.find((r) => r.slug === slug);