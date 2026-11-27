import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Building2, Car, Coffee, Droplets, Dumbbell, Flame, HeartPulse,
  Leaf, Lock, MessageCircle, ShieldCheck, ThermometerSun, ToyBrick, Users, Zap, type LucideIcon,
} from "lucide-react";
import { reveal } from "@/lib/motion-variants";
import { SectionLabel } from "./section-label";

const WHATSAPP = "918882012012"; // TODO: confirm this number is on WhatsApp

/* ------------------------------------------------------------------ data */
type Cat = { title: string; short: string; desc: string; icon: LucideIcon };
const cats: Cat[] = [
  { title: "Wellness & Leisure", short: "Wellness", desc: "Stay active, unwind and meet the neighbours.", icon: HeartPulse },
  { title: "Family & Dining", short: "Family", desc: "Easy spaces for children, coffee and company.", icon: Users },
  { title: "Safe & Secure", short: "Safety", desc: "Safety systems that work quietly in the background.", icon: Lock },
  { title: "Smart Utilities", short: "Utilities", desc: "Power, water and parking, taken care of.", icon: Leaf },
];

type Amenity = { title: string; cat: number; icon: LucideIcon; desc: string; image: string; pos: string };
/* TODO: swap each image for its own photo, e.g. /images/amenities/gym.webp */
const amenities: Amenity[] = [
  { title: "Gym", cat: 0, icon: Dumbbell, desc: "A fitness space to keep your routine going without leaving the community.", image: "/images/tarudhan-villa.webp", pos: "20% 50%" },
  { title: "Sauna", cat: 0, icon: ThermometerSun, desc: "Unwind with a warm, quiet sauna session after a round of golf or a long week.", image: "/images/tarudhan-pool.webp", pos: "60% 40%" },
  { title: "Club House", cat: 0, icon: Building2, desc: "The community's social heart for gatherings, leisure and weekend get-togethers.", image: "/images/tarudhan-hero.webp", pos: "60% 50%" },
  { title: "Cafeteria", cat: 1, icon: Coffee, desc: "A relaxed spot for a quick coffee, a light bite or a catch-up with neighbours.", image: "/images/tarudhan-pool.webp", pos: "30% 60%" },
  { title: "Children's Play Area", cat: 1, icon: ToyBrick, desc: "A safe, open space for children to play, run and make friends.", image: "/images/tarudhan-course.webp", pos: "center" },
  { title: "Security Systems", cat: 2, icon: ShieldCheck, desc: "Security systems within a gated community for everyday peace of mind.", image: "/images/tarudhan-hero.webp", pos: "20% 60%" },
  { title: "Fire Fighting Systems", cat: 2, icon: Flame, desc: "Fire safety systems installed as part of the community's safety infrastructure.", image: "/images/tarudhan-villa.webp", pos: "80% 55%" },
  { title: "Power Backup", cat: 3, icon: Zap, desc: "Backup power to keep the essentials running through outages.", image: "/images/tarudhan-course.webp", pos: "20% 50%" },
  { title: "Rain Water Harvesting", cat: 3, icon: Droplets, desc: "Captures rainwater for reuse, a quiet step toward more sustainable living.", image: "/images/tarudhan-course.webp", pos: "70% 45%" },
  { title: "Car Parking", cat: 3, icon: Car, desc: "Dedicated parking for residents and their guests.", image: "/images/tarudhan-villa.webp", pos: "50% 60%" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const styles = `
.am-skel { position:absolute; inset:0; background:linear-gradient(100deg,var(--muted) 30%,color-mix(in oklab,var(--muted) 55%,white) 50%,var(--muted) 70%); background-size:200% 100%; animation:am-shimmer 1.5s ease-in-out infinite; }
.am-dark .am-skel { background-image:linear-gradient(100deg,oklch(.22 .036 151) 30%,oklch(.31 .04 151) 50%,oklch(.22 .036 151) 70%); }
@keyframes am-shimmer { to { background-position:-200% 0; } }
.am-scroll { scrollbar-width:none; -webkit-overflow-scrolling:touch; }
.am-scroll::-webkit-scrollbar { display:none; }
@media (prefers-reduced-motion: reduce) { .am-skel { animation:none; } }
`;

/* ------------------------------------------------------------------ image with skeleton + fade-in */
function Pic({ src, alt, pos = "center", className = "absolute inset-0", imgClass = "", eager = false }: { src: string; alt: string; pos?: string; className?: string; imgClass?: string; eager?: boolean }) {
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setOk(true);
  }, []);
  return (
    <div className={`${className} overflow-hidden bg-muted`}>
      {!ok && <span className="am-skel" aria-hidden="true" />}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onLoad={() => setOk(true)}
        onError={() => setOk(true)}
        style={{ objectPosition: pos }}
        className={`size-full object-cover transition-[opacity,transform] duration-700 ease-out ${ok ? "opacity-100" : "opacity-0"} ${imgClass}`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ section */
export function AmenitiesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const item = amenities[active];
  const items = amenities.filter((a) => a.cat === item.cat);
  const idx = items.indexOf(item);
  const cat = cats[item.cat];
  const ItemIcon = item.icon;

  const pickCat = (c: number) => setActive(amenities.findIndex((a) => a.cat === c));
  const go = (d: number) => setActive(amenities.indexOf(items[(idx + d + items.length) % items.length]));

  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ["start end", "end start"] });
  const bandY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi, I'd like to know more about the ${item.title} at Tarudhan Valley.`)}`;

  return (
    <section id="amenities" className="overflow-hidden bg-secondary/50 py-16 md:py-28">
      <style>{styles}</style>
      <div className="mx-auto max-w-[1520px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* ============ 1. Intro: collage + text ============ */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-[1.3fr_1fr] gap-2.5 md:gap-3">
            <motion.figure variants={reveal} className="group relative row-span-2 h-[300px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-[460px]">
              <Pic src="/images/tarudhan-hero.webp" alt="Illustrative view of the Tarudhan Valley community" pos="62% 55%" eager imgClass="group-hover:scale-105" />
            </motion.figure>
            <motion.figure variants={reveal} className="group relative h-[145px] overflow-hidden rounded-2xl sm:h-[195px] lg:h-[224px]">
              <Pic src="/images/tarudhan-villa.webp" alt="Illustrative view of a villa" imgClass="group-hover:scale-105" />
            </motion.figure>
            <motion.figure variants={reveal} className="group relative h-[145px] overflow-hidden rounded-2xl sm:h-[195px] lg:h-[224px]">
              <Pic src="/images/tarudhan-pool.webp" alt="Illustrative view of the pool area" imgClass="group-hover:scale-105" />
            </motion.figure>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="min-w-0">
            <motion.div variants={reveal}><SectionLabel>Make the most of the day</SectionLabel></motion.div>
            <h2 className="serif-display mt-4 text-[clamp(2.4rem,1.4rem+4.4vw,4.75rem)] leading-[1]">Good days,<br />built in.</h2>
            <motion.p variants={reveal} className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground md:text-base">
              Leisure has a way of finding you here. From a quiet sauna to a lively club house, everything for the everyday sits inside the gates.
            </motion.p>
            <motion.div variants={reveal} className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#amenity-showcase" className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
                Explore amenities <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
              <span className="flex items-center gap-3">
                <span className="flex -space-x-2" aria-hidden="true">
                  {[Dumbbell, Coffee, ShieldCheck, Zap].map((I, i) => (
                    <span key={i} className="flex size-9 items-center justify-center rounded-full border-2 border-secondary bg-card text-primary"><I className="size-4" /></span>
                  ))}
                </span>
                <span className="text-sm leading-4 text-muted-foreground"><strong className="font-medium text-foreground">10 amenities</strong><br />across 4 groups</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ============ 2. Group cards ============ */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mt-10 grid grid-cols-2 gap-2.5 md:mt-14 md:gap-4 lg:grid-cols-4">
          {cats.map((c, i) => {
            const Icon = c.icon;
            const on = item.cat === i;
            const count = amenities.filter((a) => a.cat === i).length;
            return (
              <motion.a
                key={c.title}
                variants={reveal}
                href="#amenity-showcase"
                onClick={() => pickCat(i)}
                aria-label={`${c.title}: show ${count} amenities`}
                className={`group min-w-0 rounded-2xl border p-4 transition-all duration-500 hover:-translate-y-1 md:p-5 ${on ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card"}`}
              >
                <span className={`flex size-11 items-center justify-center rounded-xl border transition-colors duration-500 md:size-12 ${on ? "border-white/30 text-lime" : "border-border text-primary"}`}><Icon className="size-5 md:size-6" aria-hidden="true" /></span>
                <h3 className="serif-display mt-3 text-[1.05rem] leading-tight md:mt-4 md:text-xl">{c.title}</h3>
                <p className={`mt-1.5 text-xs leading-5 md:text-[13px] ${on ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{c.desc}</p>
                <p className={`mt-3 text-[11px] uppercase tracking-[0.14em] ${on ? "text-lime" : "text-primary/70"}`}>{count} amenities</p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* ============ 3. Dark showcase ============ */}
        <motion.div id="amenity-showcase" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={reveal} className="am-dark mt-5 rounded-[1.75rem] bg-deep p-3 text-primary-foreground sm:p-5 md:mt-6 md:p-7">
          <div className="flex flex-col gap-4 px-1 pb-4 pt-2 md:flex-row md:items-end md:justify-between md:pb-6">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.16em] text-lime">Curated amenities</p>
              <h3 className="serif-display mt-2 text-2xl leading-tight sm:text-3xl md:text-4xl">Everything at your doorstep.</h3>
            </div>
            <div className="am-scroll -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist" aria-label="Amenity groups">
              {cats.map((c, i) => {
                const Icon = c.icon;
                const on = item.cat === i;
                return (
                  <button key={c.title} type="button" role="tab" aria-selected={on} onClick={() => pickCat(i)} className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300 ${on ? "border-lime bg-lime font-medium text-deep" : "border-white/25 text-primary-foreground/85 hover:bg-white/10"}`}>
                    <Icon className="size-4" aria-hidden="true" /> {c.short}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 md:gap-4 lg:grid-cols-[1.35fr_1fr]">
            {/* Image */}
            <div className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl bg-black/30 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px]">
              <AnimatePresence initial={false}>
                <motion.div key={item.title} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <Pic src={item.image} alt={`${item.title} at Tarudhan Valley (illustrative)`} pos={item.pos} />
                </motion.div>
              </AnimatePresence>
              <div className="bg-image-scrim absolute inset-0" />
              <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] backdrop-blur-md md:left-4 md:top-4">{cat.title}</span>
              <span className="absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.14em] text-white/80 md:bottom-4 md:left-4">Illustrative image</span>
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-col justify-between gap-6 rounded-2xl border border-white/12 bg-white/[0.06] p-5 md:p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-lime text-deep"><ItemIcon className="size-5" aria-hidden="true" /></span>
                  <span className="text-xs tracking-[0.16em] text-primary-foreground/70">{String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                    <h3 className="serif-display mt-5 text-3xl leading-[1.05] md:text-4xl">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-primary-foreground/75">{item.desc}</p>
                  </motion.div>
                </AnimatePresence>

                <ul className="mt-5 space-y-1.5" aria-label={`Amenities in ${cat.title}`}>
                  {items.map((a) => {
                    const I = a.icon;
                    const on = a === item;
                    return (
                      <li key={a.title}>
                        <button type="button" onClick={() => setActive(amenities.indexOf(a))} aria-pressed={on} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors duration-300 ${on ? "border-lime/60 bg-white/10 text-white" : "border-white/10 text-primary-foreground/70 hover:bg-white/5"}`}>
                          <I className={`size-4 shrink-0 ${on ? "text-lime" : ""}`} aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{a.title}</span>
                          <ArrowUpRight className={`size-4 shrink-0 transition-opacity ${on ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex items-center gap-2.5">
                <a href={wa} target="_blank" rel="noreferrer" className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-lime px-4 text-sm font-medium text-deep transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
                  <MessageCircle className="size-4 shrink-0" aria-hidden="true" /> <span className="truncate">Enquire about this</span>
                </a>
                <button type="button" onClick={() => go(-1)} aria-label="Previous amenity" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"><ArrowLeft className="size-4" aria-hidden="true" /></button>
                <button type="button" onClick={() => go(1)} aria-label="Next amenity" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"><ArrowRight className="size-4" aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ 4. At a glance: image band + all amenities ============ */}
        <div ref={bandRef} className="relative mt-5 overflow-hidden rounded-[1.75rem] bg-deep md:mt-6">
          <motion.div style={{ y: bandY }} className="absolute inset-x-0 -inset-y-[10%]">
            <Pic src="/images/tarudhan-course.webp" alt="Illustrative view of the golf course and landscaped grounds" pos="center" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55" />

          <div className="relative px-3 pb-3 pt-24 sm:px-5 sm:pb-5 sm:pt-40 md:px-7 md:pb-7 md:pt-52">
            <div className="mb-5 px-1 text-white md:mb-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-lime">At a glance</p>
              <h3 className="serif-display mt-2 max-w-xl text-2xl leading-tight sm:text-3xl md:text-4xl">Ten amenities, all within the gates.</h3>
            </div>
            <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
              {amenities.map((a, i) => {
                const I = a.icon;
                return (
                  <motion.li key={a.title} variants={reveal} className="min-w-0">
                    <a href="#amenity-showcase" onClick={() => setActive(i)} aria-label={`${a.title}: view details`} className="group flex h-full flex-col rounded-2xl bg-card/95 p-3.5 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-1 md:p-4">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground"><I className="size-5" aria-hidden="true" /></span>
                      <h4 className="serif-display mt-3 text-[1rem] leading-tight md:text-lg">{a.title}</h4>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground sm:line-clamp-3">{a.desc}</p>
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-[12px] leading-5 text-muted-foreground">
          Amenities as listed for the community; availability and specifications to be confirmed with the developer. Images are illustrative.
        </p>
      </div>
    </section>
  );
}