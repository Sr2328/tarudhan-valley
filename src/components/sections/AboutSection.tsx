import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Flag, Hotel, Home, KeyRound, MapPin, ShieldCheck, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { reveal } from "@/lib/motion-variants";
import { SectionLabel } from "./section-label";

/* ------------------------------------------------------------------ data
 * Facts come from the developer's project page and the hotel operator's fact sheet.
 * Investment copy is deliberately non-promissory: no return figures are stated.
 * ------------------------------------------------------------------------ */

const homeTypes = [
  { n: "01", title: "Orchard Homes", line: "Homes among the greens", src: "/images/tarudhan-hero.webp", pos: "62% 55%", alt: "Illustrative view of homes set among trees at Tarudhan Valley" },
  { n: "02", title: "Golf Villas", line: "2 & 3 BHK by the course", src: "/images/tarudhan-villa.webp", pos: "center", alt: "Illustrative view of a golf villa at Tarudhan Valley" },
  { n: "03", title: "Studio Apartments", line: "Easy, compact living", src: "/images/tarudhan-pool.webp", pos: "center", alt: "Illustrative view of the pool near the studio apartments at Tarudhan Valley" },
] as const;

type Feature = {
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  src: string;
  pos: string;
  alt: string;
  shape: string;
};

/* Different silhouettes so the marquee feels like a collage, not a row of boxes. */
const SHAPES = {
  arch: "rounded-t-[999px] rounded-b-[1.75rem]",
  leaf: "rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-[1.75rem] rounded-bl-[1.75rem]",
  soft: "rounded-[2rem]",
  scoop: "rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-[1.75rem] rounded-br-[1.75rem]",
} as const;

const features: Feature[] = [
  {
    icon: TrendingUp,
    tag: "Investment",
    title: "Strong ROI potential",
    text: "Limited inventory: 141 units across 65 acres in a golf-led community. Ask for current pricing and resale data; returns are not guaranteed.",
    src: "/images/tarudhan-hero.webp",
    pos: "70% 45%",
    alt: "Illustrative aerial view of the Tarudhan Valley community",
    shape: SHAPES.arch,
  },
  {
    icon: Building2,
    tag: "Commercial",
    title: "Commercial & hospitality scope",
    text: "A resort hotel, conferencing facilities and banquet lawns on site support events and hospitality use. Confirm permitted use for each unit.",
    src: "/images/tarudhan-pool.webp",
    pos: "40% 60%",
    alt: "Illustrative view of the resort leisure area",
    shape: SHAPES.leaf,
  },
  {
    icon: KeyRound,
    tag: "Ready",
    title: "Ready to move",
    text: "The community is completed, so you can move in or put the home to use without waiting on construction timelines.",
    src: "/images/tarudhan-villa.webp",
    pos: "80% 55%",
    alt: "Illustrative view of a completed villa",
    shape: SHAPES.soft,
  },
  {
    icon: Hotel,
    tag: "Hospitality",
    title: "Branded hotel on site",
    text: "Lemon Tree Hotels operates the resort hotel, bringing an established hospitality name into the valley.",
    src: "/images/tarudhan-course.webp",
    pos: "20% 50%",
    alt: "Illustrative view across the course towards the resort",
    shape: SHAPES.scoop,
  },
  {
    icon: Flag,
    tag: "Lifestyle",
    title: "Golf lifestyle, built in",
    text: "A nine-hole course by Graham Cooke and a driving range: the draw for weekend-home and second-home buyers.",
    src: "/images/tarudhan-course.webp",
    pos: "center",
    alt: "Illustrative view of the nine-hole golf course",
    shape: SHAPES.arch,
  },
  {
    icon: Home,
    tag: "Choice",
    title: "A home for every plan",
    text: "Studio apartments, villas and Balinese-style wooden cottages suit different budgets, uses and stages of life.",
    src: "/images/tarudhan-villa.webp",
    pos: "25% 60%",
    alt: "Illustrative view of villa terraces",
    shape: SHAPES.leaf,
  },
  {
    icon: ShieldCheck,
    tag: "Community",
    title: "Gated, green, amenity-rich",
    text: "65 landscaped acres with a clubhouse, spa, swimming pool and sports facilities inside a gated community.",
    src: "/images/tarudhan-hero.webp",
    pos: "20% 60%",
    alt: "Illustrative view of the landscaped community",
    shape: SHAPES.soft,
  },
  {
    icon: MapPin,
    tag: "Location",
    title: "Manesar, Gurugram",
    text: "On Naurangpur–Tauru Road in the Manesar area of Gurugram district, within reach of the wider Delhi NCR.",
    src: "/images/tarudhan-pool.webp",
    pos: "70% 40%",
    alt: "Illustrative view of the valley setting",
    shape: SHAPES.scoop,
  },
];

const facts = [
  ["Type", "Studio apartments, villas"],
  ["Price", "On request"],
  ["Area", "65 acres"],
  ["Units", "141"],
  ["Status", "Completed"],
  ["RERA", "N/A, as listed"],
] as const;

const onProperty = ["Apartments", "Villas", "Balinese-style wooden cottages", "Clubhouse", "Resort hotel", "Conferencing facilities", "Golf driving range"] as const;

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const Icon = f.icon;
  return (
    <article className={`about-feature group relative mr-4 h-[420px] w-[264px] shrink-0 overflow-hidden bg-deep sm:h-[460px] sm:w-[300px] lg:h-[500px] lg:w-[340px] ${f.shape} ${index % 2 ? "mt-6 lg:mt-8" : ""}`}>
      <img src={f.src} alt={f.alt} loading="lazy" decoding="async" width={680} height={1000} style={{ objectPosition: f.pos }} className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
      <div className="bg-image-scrim absolute inset-0" />
      <span className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md sm:top-6">{f.tag}</span>
      <div className="absolute inset-x-3 bottom-3 rounded-[1.4rem] border border-white/20 bg-black/35 p-4 text-primary-foreground backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-5">
        <span className="flex size-9 items-center justify-center rounded-full bg-lime text-deep"><Icon className="size-4" aria-hidden="true" /></span>
        <h3 className="serif-display mt-3 text-xl leading-tight sm:text-2xl">{f.title}</h3>
        <p className="mt-2 text-[13px] leading-5 text-primary-foreground/80">{f.text}</p>
      </div>
    </article>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        {/* ---------- Row 1: three home types + about text ---------- */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="grid grid-cols-3 gap-3 md:gap-4">
            {homeTypes.map((card) => (
              <motion.figure key={card.n} variants={reveal} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-deep md:aspect-[4/5] lg:aspect-auto lg:min-h-[320px]">
                <img src={card.src} alt={card.alt} loading="lazy" decoding="async" width={640} height={800} style={{ objectPosition: card.pos }} className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="bg-image-scrim absolute inset-0" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-primary-foreground md:p-4">
                  <span className="block text-[11px] tracking-[0.16em] text-primary-foreground/70">{card.n}</span>
                  <span className="serif-display mt-1 block text-[13px] leading-tight sm:text-base md:text-xl">{card.title}</span>
                  <span className="mt-1 hidden text-xs text-primary-foreground/75 md:block">{card.line}</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="flex flex-col justify-between gap-8 lg:py-2">
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"><Sparkles className="size-4 text-primary" aria-hidden="true" />About Tarudhan Valley</p>
              <p className="mt-4 max-w-xl text-base leading-[1.6] text-muted-foreground md:text-[17px]">
                The flagship project of Silverglades, Tarudhan Valley spreads across 65 green acres in Manesar, Gurugram, and is described by the developer as India’s first gated golf community. Golf homes are set around a nine-hole course designed by Graham Cooke, alongside apartments, villas and Balinese-style wooden cottages.
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-border pt-5">
              <span className="flex -space-x-2" aria-hidden="true">
                {["S", "G"].map((letter, i) => (
                  <span key={letter} className={`flex size-10 items-center justify-center rounded-full border-2 border-background text-sm font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-lime text-deep"}`}>{letter}</span>
                ))}
              </span>
              <p className="text-sm leading-5 text-muted-foreground"><strong className="font-medium text-foreground">Developed by Silverglades</strong><br />Nine-hole course by Graham Cooke</p>
            </div>
          </motion.div>
        </div>

        {/* ---------- Row 2: heading for the key-feature marquee ---------- */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal} className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12">
          <div>
            <SectionLabel>Key features</SectionLabel>
            <h2 className="serif-display mt-5 max-w-2xl text-4xl leading-[1.02] md:text-6xl">Why buyers and investors look twice.</h2>
            <span className="mt-5 block h-[2px] w-16 bg-primary" aria-hidden="true" />
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-base lg:justify-self-end">
            A completed golf community with a branded hotel, flexible home types and room for hospitality and events. Hover to pause, or just watch it glide.
          </p>
        </motion.div>
      </div>

      {/* ---------- Infinite marquee: full-bleed, drifts in from the right ---------- */}
      <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="about-marquee mt-10 md:mt-14" role="region" aria-label="Key features of Tarudhan Valley">
        <div className="about-marquee-track items-start pb-10">
          {features.map((f, i) => <FeatureCard key={f.title} f={f} index={i} />)}
          {/* duplicate set makes the loop seamless; hidden from assistive tech */}
          <div className="flex items-start" aria-hidden="true">
            {features.map((f, i) => <FeatureCard key={`dup-${f.title}`} f={f} index={i} />)}
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        {/* CTA */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={reveal} className="flex flex-col gap-4 rounded-[1.75rem] bg-deep p-6 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="serif-display text-2xl md:text-3xl">Pricing is on request.</p>
            <p className="mt-1 text-sm text-primary-foreground/75">Ask about current availability, unit types and permitted use.</p>
          </div>
          <a href="#location" className="inline-flex h-[3.1rem] w-full items-center justify-center gap-3 rounded-full bg-lime px-6 text-[15px] font-medium text-deep transition-transform duration-300 hover:-translate-y-0.5 md:w-auto"><span className="size-2 rounded-full bg-deep" />Request details<ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </motion.div>

        {/* ---------- Details table ---------- */}
        <motion.dl initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-14 md:grid-cols-3 xl:grid-cols-6">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-card p-4 md:p-5">
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary/70">{label}</dt>
              <dd className="serif-display mt-1.5 text-lg md:text-xl">{value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* ---------- On the property ---------- */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal} className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <p className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">On the property</p>
          <ul className="flex flex-wrap gap-2">
            {onProperty.map((item) => (
              <li key={item} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground">{item}</li>
            ))}
          </ul>
        </motion.div>

        <p className="mt-6 max-w-3xl text-[12px] leading-5 text-muted-foreground">
          Details are as published by the developer and hotel operator and may change; please verify directly before making any decision. Real estate returns are not guaranteed, and permitted use varies by unit. Images are illustrative.
        </p>
      </div>
    </section>
  );
}