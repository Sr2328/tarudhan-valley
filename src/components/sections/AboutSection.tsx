import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { reveal } from "@/lib/motion-variants";
import { SectionLabel } from "./section-label";

/* Facts as published on the developer's project page. Verify before launch. */
const highlightCards = [
  { n: "01", title: "Golf, at your door", src: "/images/tarudhan-course.webp", alt: "Illustrative view of the nine-hole course at Tarudhan Valley", pos: "center" },
  { n: "02", title: "Villas & cottages", src: "/images/tarudhan-villa.webp", alt: "Illustrative view of a villa at Tarudhan Valley", pos: "center" },
  { n: "03", title: "Resort leisure", src: "/images/tarudhan-pool.webp", alt: "Illustrative view of the pool at Tarudhan Valley", pos: "center" },
] as const;

const railImages = [
  { src: "/images/tarudhan-hero.webp", alt: "Illustrative aerial view of Tarudhan Valley and its fairways", pos: "center 40%", className: "w-[84vw] sm:w-[58%]" },
  { src: "/images/tarudhan-villa.webp", alt: "Illustrative golf villa terrace", pos: "75% 60%", className: "w-[58vw] sm:w-[23%]" },
  { src: "/images/tarudhan-pool.webp", alt: "Illustrative pool and leisure area", pos: "center", className: "w-[58vw] sm:w-[23%]" },
  { src: "/images/tarudhan-course.webp", alt: "Illustrative view across the course", pos: "30% 50%", className: "w-[58vw] sm:w-[23%]" },
] as const;

const facts = [
  ["Type", "Studio apartments, villas"],
  ["Price", "On request"],
  ["Area", "65 acres"],
  ["Units", "141"],
  ["Status", "Completed"],
  ["RERA", "N/A, as listed"],
] as const;

const onProperty = [
  "Apartments",
  "Villas",
  "Balinese-style wooden cottages",
  "Clubhouse",
  "Resort hotel",
  "Conferencing facilities",
  "Golf driving range",
] as const;

export function AboutSection() {
  const rail = useRef<HTMLDivElement>(null);
  const scrollRail = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.6, 260), behavior: "smooth" });
  };

  return (
    <section id="about" className="relative bg-background px-6 py-20 md:px-12 md:py-28 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        {/* ---------- Row 1: three highlight cards + about text ---------- */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="grid grid-cols-3 gap-3 md:gap-4">
            {highlightCards.map((card) => (
              <motion.figure key={card.n} variants={reveal} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-deep md:aspect-[4/5] lg:aspect-auto lg:min-h-[300px]">
                <img src={card.src} alt={card.alt} loading="lazy" decoding="async" width={640} height={800} style={{ objectPosition: card.pos }} className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="bg-image-scrim absolute inset-0" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-primary-foreground md:p-4">
                  <span className="block text-[11px] tracking-[0.16em] text-primary-foreground/70">{card.n}</span>
                  <span className="serif-display mt-1 block text-[13px] leading-tight md:text-lg">{card.title}</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="flex flex-col justify-between gap-8 lg:py-2">
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"><Sparkles className="size-4 text-primary" aria-hidden="true" />About Tarudhan Valley</p>
              <p className="mt-4 max-w-xl text-base leading-[1.6] text-muted-foreground md:text-[17px]">
                The flagship project of Silverglades, Tarudhan Valley spreads across 65 green acres in Manesar, Gurugram. Golf homes are set around a nine-hole course designed by Graham Cooke, with apartments, villas and Balinese-style wooden cottages for gracious, unhurried living.
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

        {/* ---------- Row 2: heading + rail ---------- */}
        <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-[0.8fr_2.2fr] lg:gap-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal} className="flex flex-col justify-between gap-8">
            <div>
              <SectionLabel>The valley</SectionLabel>
              <h2 className="serif-display mt-5 text-4xl leading-[1.02] md:text-5xl">India’s first gated golf community</h2>
              <span className="mt-5 block h-[2px] w-16 bg-primary" aria-hidden="true" />
              <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                That is how the developer describes it: a country-life setting with exotic golf homes dotted around the course, a clubhouse, a resort hotel and a golf driving range, all in one gated valley.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => scrollRail(-1)} aria-label="Previous image" className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><ArrowLeft className="size-4" /></button>
              <button type="button" onClick={() => scrollRail(1)} aria-label="Next image" className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"><ArrowRight className="size-4" /></button>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="-mx-6 md:mx-0">
            <div ref={rail} className="about-rail flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 md:gap-4 md:px-0" tabIndex={0} aria-label="Tarudhan Valley images">
              {railImages.map((img) => (
                <figure key={img.src + img.pos} className={`group relative h-[320px] shrink-0 snap-start overflow-hidden rounded-2xl bg-deep sm:h-[380px] lg:h-[440px] ${img.className}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" width={1200} height={900} style={{ objectPosition: img.pos }} className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                </figure>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Details table ---------- */}
        <motion.dl initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-20 md:grid-cols-3 xl:grid-cols-6">
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
          Details are as published by the developer and may change; please verify directly before making any decision. Images are illustrative.
        </p>
      </div>
    </section>
  );
}