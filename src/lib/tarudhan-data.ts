export const projectFacts = {
  communityAcres: 65,
  resortAcres: 72,
  courseHoles: 9,
  homes: 141,
  developer: "Silverglades",
  architect: "Graham Cooke",
  operator: "Lemon Tree Hotels",
  status: "Completed",
} as const;

export const overviewCards = [
  {
    index: "01",
    image: "/images/tarudhan-hero.webp",
    imageAlt: "Illustrative aerial view of the Tarudhan Valley community and fairways",
    imagePosition: "center 40%",
    label: "A greener address",
    value: "65 acres",
    note: "Gated golf community",
    description:
      "Silverglades lists Tarudhan Valley as a 65-acre gated golf community. Lemon Tree's hotel fact sheet separately describes its resort property as roughly 72 acres.",
  },
  {
    index: "02",
    image: "/images/tarudhan-course.webp",
    imageAlt: "Illustrative view of the nine-hole golf course at Tarudhan Valley",
    imagePosition: "center",
    label: "Golf, in your backyard",
    value: "09 holes",
    note: "Designed by Graham Cooke",
    description:
      "A nine-hole course by golf architect Graham Cooke, with a driving range and room to work on your game, right where you live.",
  },
  {
    index: "03",
    image: "/images/tarudhan-villa.webp",
    imageAlt: "Illustrative view of a villa at Tarudhan Valley",
    imagePosition: "center",
    label: "Room to belong",
    value: "141 homes",
    note: "Project-listed residences",
    description:
      "The developer's project page lists 141 residences across the community, set among fairways, leafy paths and open greens.",
  },
  {
    index: "04",
    image: "/images/tarudhan-villa.webp",
    imageAlt: "Illustrative view of a golf villa terrace at Tarudhan Valley",
    imagePosition: "80% 60%",
    label: "A considered collection",
    value: "3 choices",
    note: "Studios · 2 & 3 BHK",
    description:
      "Studio apartments for easy living, and independent 2 and 3 BHK villas for those who want more space to settle in.",
  },
  {
    index: "05",
    image: "/images/tarudhan-hero.webp",
    imageAlt: "Illustrative view of the completed Tarudhan Valley community",
    imagePosition: "85% 70%",
    label: "Here, already",
    value: "Complete",
    note: "Ready-to-move community",
    description:
      "The developer lists the project as completed, so the community, its clubhouse and its amenities are already in place.",
  },
  {
    index: "06",
    image: "/images/tarudhan-pool.webp",
    imageAlt: "Illustrative view of the pool and resort leisure areas at Tarudhan Valley",
    imagePosition: "center",
    label: "Hospitality, handled",
    value: "2016 opened",
    note: "Lemon Tree resort hotel",
    description:
      "Lemon Tree Hotels operates the resort hotel here, which a March 2016 trade report describes as opening that year. Hotel stays and residences are distinct offerings.",
  },
] as const;

export const homes = [
  { title: "Studio apartments", number: "01", detail: "Considered studio living", src: "/images/tarudhan-pool.webp", alt: "Illustrative view of resort pool and clubhouse" },
  { title: "Two-bedroom villas", number: "02", detail: "Space to settle in", src: "/images/tarudhan-villa.webp", alt: "Illustrative view of a villa opening onto landscaped grounds" },
  { title: "Three-bedroom villas", number: "03", detail: "A little more room to breathe", src: "/images/tarudhan-hero.webp", alt: "Illustrative aerial view of fairways and residences" },
] as const;

export const amenities = [
  { number: "01", title: "Golf course & driving range", description: "Nine holes conceived by Graham Cooke, with a driving range and space to work on your game.", image: "/images/tarudhan-course.webp", alt: "Illustrative green golf course at sunrise" },
  { number: "02", title: "Outdoor swimming pool", description: "A refreshing pause, alongside the open greens and resort setting.", image: "/images/tarudhan-pool.webp", alt: "Illustrative resort swimming pool" },
  { number: "03", title: "Independent villas", description: "Private residences nestled among leafy paths and fairways.", image: "/images/tarudhan-villa.webp", alt: "Illustrative independent villa with garden" },
  { number: "04", title: "Clubhouse", description: "A natural meeting point, bringing leisure and good company together.", image: "/images/tarudhan-pool.webp", alt: "Illustrative resort grounds and architecture" },
  { number: "05", title: "Tatva spa", description: "Spa, sauna and steam for a more restorative kind of afternoon.", image: "/images/tarudhan-villa.webp", alt: "Illustrative peaceful villa and gardens" },
  { number: "06", title: "Restaurant & bar", description: "The Lemon Tree resort brings its dining and bar experience to the valley.", image: "/images/tarudhan-pool.webp", alt: "Illustrative hospitality setting by the pool" },
  { number: "07", title: "Sports & fitness", description: "A thoughtfully varied mix of indoor and outdoor ways to keep moving.", image: "/images/tarudhan-course.webp", alt: "Illustrative landscaped green grounds" },
  { number: "08", title: "Celebrations & play", description: "Banquet lawns, open-air celebrations and room for younger guests to play.", image: "/images/tarudhan-hero.webp", alt: "Illustrative aerial view of the community" },
] as const;

export const galleryImages = [
  { src: "/images/tarudhan-course.webp", alt: "Illustrative golf course, water and landscaped fairways", category: "The course", shape: "gallery-wide" },
  { src: "/images/tarudhan-villa.webp", alt: "Illustrative contemporary villa among mature trees", category: "The residences", shape: "gallery-tall" },
  { src: "/images/tarudhan-pool.webp", alt: "Illustrative outdoor swimming pool and resort clubhouse", category: "The retreat", shape: "gallery-tall" },
  { src: "/images/tarudhan-hero.webp", alt: "Illustrative aerial panorama across a golf community", category: "The landscape", shape: "gallery-wide" },
] as const;

export const faqItems = [
  { question: "Is Tarudhan Valley complete?", answer: "The developer lists Tarudhan Valley as a completed project." },
  { question: "What kinds of residences are listed?", answer: "The project information lists studio apartments and villas. The residence categories featured here include studios and 2- and 3-bedroom villas; please confirm current availability directly with the developer." },
  { question: "Who developed the community?", answer: "Tarudhan Valley is a Silverglades project." },
  { question: "Who operates the hotel?", answer: "Lemon Tree Hotels operates the resort hotel. Hotel accommodation and the residential golf community are related, distinct offerings." },
  { question: "Who designed the golf course?", answer: "The nine-hole course was designed by golf-course architect Graham Cooke." },
  { question: "What are the two acreage figures about?", answer: "Silverglades describes the gated golf community as 65 acres. Lemon Tree's hotel fact sheet separately describes its resort property as approximately 72 acres; the figures refer to different property descriptions." },
  { question: "How can I arrange a visit?", answer: "Call the Silverglades sales-enquiry line at +91 88820 12012 to confirm current availability and arrange a site visit." },
] as const;

/* Replace every [bracketed] quote and name with a real, permitted review before launch.
   `stat` / `statLabel` use facts already published on the site. */
export const testimonials = [
  {
    id: "resident-1",
    name: "[Resident name]",
    role: "Resident · Independent villa",
    group: "Resident",
    stat: "141",
    statLabel: "homes across the community",
    quote: "[Real resident review about daily life in the community goes here.]",
    image: "/images/tarudhan-villa.webp",
    alt: "Villa opening onto landscaped grounds",
  },
  {
    id: "golfer-1",
    name: "[Golfer name]",
    role: "Resident · Golfer",
    group: "Golf",
    stat: "9",
    statLabel: "holes by Graham Cooke",
    quote: "[Real review about the course and driving range goes here.]",
    image: "/images/tarudhan-course.webp",
    alt: "Golf course and water at sunrise",
  },
  {
    id: "guest-1",
    name: "[Guest name]",
    role: "Guest · Lemon Tree resort",
    group: "Guest",
    stat: "2016",
    statLabel: "year the resort hotel opened",
    quote: "[Real guest review about the stay, dining or spa goes here.]",
    image: "/images/tarudhan-pool.webp",
    alt: "Resort pool and clubhouse",
  },
  {
    id: "family-1",
    name: "[Family name]",
    role: "Resident · Family",
    group: "Family",
    stat: "65",
    statLabel: "acres of open, gated greens",
    quote: "[Real review from a family about space, safety and play goes here.]",
    image: "/images/tarudhan-hero.webp",
    alt: "Aerial view of fairways and residences",
  },
  {
    id: "owner-1",
    name: "[Owner name]",
    role: "Owner · Studio apartment",
    group: "Owner",
    stat: "3",
    statLabel: "residence choices: studio, 2 and 3 BHK",
    quote: "[Real review from a studio or villa owner goes here.]",
    image: "/images/tarudhan-villa.webp",
    alt: "Contemporary villa among mature trees",
  },
  {
    id: "visitor-1",
    name: "[Visitor name]",
    role: "Visited the community",
    group: "Visitor",
    stat: "Ready",
    statLabel: "completed, ready-to-move community",
    quote: "[Real review about a site visit and the sales team goes here.]",
    image: "/images/tarudhan-course.webp",
    alt: "Landscaped green grounds",
  },
] as const;