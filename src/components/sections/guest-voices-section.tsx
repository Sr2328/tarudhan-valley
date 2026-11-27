import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform, type AnimationPlaybackControls } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionLabel } from "./section-label";
import tarudhanlogo from "@/assets/tarudhan-logo.webp"

/* All styling is Tailwind utilities in this file; nothing for this section lives in styles.css. */

const INTERVAL = 4; // seconds each slide stays on screen

/** A real, permitted customer review. Add one to any slide below and it is shown as a review. */
type RealReview = {
  name: string;
  /** e.g. "Villa owner" or "Weekend guest" */
  role: string;
  /** where it came from, e.g. "Google review, March 2026" */
  source?: string;
};

type Slide = {
  id: string;
  /** list title and image tag */
  name: string;
  /** second line in the list */
  descriptor: string;
  /** big figure; `count` animates up to it, otherwise `stat` is shown as text */
  stat: string;
  count?: number;
  suffix?: string;
  statLabel: string;
  quote: string;
  image: string;
  position: string;
  alt: string;
  /** leave undefined until you have a genuine review to show */
  review?: RealReview;
};

/*
 * These lines describe the property in the valley's own voice; they are NOT customer reviews and
 * are attributed to "Tarudhan Valley". To show a genuine review, collect it with permission and
 * fill in `review` on that slide, e.g.
 *   review: { name: "Rohit S.", role: "Villa owner", source: "Google review, 2026" }
 * and replace `quote` with their exact words.
 * Figures are the published facts used elsewhere on the site (sizes are approximate).
 */
const slides: Slide[] = [
  {
    id: "orchard-homes",
    name: "Orchard Homes",
    descriptor: "Bali style · 3,500 sq ft",
    stat: "3,500",
    count: 3500,
    statLabel: "sq ft of Bali-style living space",
    quote: "Room for everyone, and the quiet to enjoy it.",
    image: "/images/tarudhan-hero.webp",
    position: "62% 55%",
    alt: "Illustrative view of homes set among trees at Tarudhan Valley",
  },
  {
    id: "golf-villas",
    name: "Golf Villas",
    descriptor: "2 & 3 BHK villas",
    stat: "2 & 3",
    statLabel: "BHK villas, each on its own plot",
    quote: "The course is right there, so weekends finally feel like weekends.",
    image: "/images/tarudhan-villa.webp",
    position: "center",
    alt: "Illustrative view of a golf villa at Tarudhan Valley",
  },
  {
    id: "studio-apartments",
    name: "Studio Apartments",
    descriptor: "950 to 1,100 sq ft",
    stat: "950+",
    count: 950,
    suffix: "+",
    statLabel: "sq ft studios, up to 1,100 sq ft",
    quote: "Compact and easy to run, with the whole valley on your doorstep.",
    image: "/images/tarudhan-pool.webp",
    position: "30% 60%",
    alt: "Illustrative view of the pool near the studio apartments",
  },
  {
    id: "golf-course",
    name: "The Golf Course",
    descriptor: "9 holes · Graham Cooke",
    stat: "9",
    count: 9,
    statLabel: "holes designed by Graham Cooke",
    quote: "Nine holes, open skies and long walks to match.",
    image: "/images/tarudhan-course.webp",
    position: "center",
    alt: "Illustrative view of the nine-hole golf course",
  },
  {
    id: "resort",
    name: "Resort & Pool",
    descriptor: "Lemon Tree resort hotel",
    stat: "2016",
    statLabel: "year the Lemon Tree resort hotel opened",
    quote: "Stay for a weekend, or make it home.",
    image: "/images/tarudhan-pool.webp",
    position: "75% 50%",
    alt: "Illustrative view of the resort pool and leisure area",
  },
  {
    id: "the-valley",
    name: "The Valley",
    descriptor: "65 acres · Gated",
    stat: "65",
    count: 65,
    statLabel: "acres of open, gated greens",
    quote: "A setting that makes it easy to switch off.",
    image: "/images/tarudhan-hero.webp",
    position: "20% 60%",
    alt: "Illustrative aerial view of the Tarudhan Valley community",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const scrollbarless = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/** Big figure: counts up when it appears (instantly with reduced motion). */
function Stat({ slide, reduce }: { slide: Slide; reduce: boolean }) {
  const value = useMotionValue(reduce ? (slide.count ?? 0) : 0);
  const shown = useTransform(value, (v) => `${Math.round(v).toLocaleString("en-IN")}${slide.suffix ?? ""}`);

  useEffect(() => {
    if (slide.count == null || reduce) return;
    const controls = animate(value, slide.count, { duration: 1.3, ease: EASE });
    return () => controls.stop();
  }, [slide.count, reduce, value]);

  if (slide.count == null) return <>{slide.stat}</>;
  return <motion.span>{shown}</motion.span>;
}

export function GuestVoicesSection() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const pausedRef = useRef(false);
  const progress = useMotionValue(0);
  const total = slides.length;

  const t = slides[active] ?? slides[0]!;
  const go = (dir: number) => setActive((i) => (i + dir + total) % total);
  const autoplay = inView && !reduce;

  // Who the line is attributed to: a real reviewer if provided, otherwise the valley itself.
  const author = t.review ? t.review.name : "Tarudhan Valley";
  const authorRole = t.review ? [t.review.role, t.review.source].filter(Boolean).join(" · ") : `On ${t.name}`;
  const hasRealReviews = slides.some((s) => s.review);
  const spring = reduce ? { duration: 0 } : ({ type: "spring", stiffness: 420, damping: 38 } as const);

  /* Only run while the section is on screen */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e && setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* The progress bar IS the timer: when it fills in INTERVAL seconds, move to the next slide. */
  useEffect(() => {
    progress.set(reduce ? 1 : 0);
    if (!autoplay) return;
    const controls = animate(progress, 1, {
      duration: INTERVAL,
      ease: "linear",
      onComplete: () => setActive((i) => (i + 1) % total),
    });
    controlsRef.current = controls;
    if (pausedRef.current) controls.pause();
    return () => controls.stop();
  }, [active, autoplay, reduce, progress, total]);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) controlsRef.current?.pause();
    else controlsRef.current?.play();
  }, [paused]);

  /* Keep the active chip centred in the horizontal mobile list */
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item || list.scrollWidth <= list.clientWidth + 1) return;
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(-1); }
  };

  return (
    <section id="reviews" ref={rootRef} className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="mb-8 px-2 md:mb-12">
          <SectionLabel>Notes from the valley</SectionLabel>
          <h2 className="serif-display mt-4 text-[clamp(2.2rem,5vw,4.5rem)] leading-[1]">A place to come back to.</h2>
        </div>

        {/* Card */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="grid gap-4 overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-3 shadow-[0_40px_90px_-50px_rgba(8,38,24,0.45)] md:rounded-[2.25rem] md:p-4 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-8 lg:p-5"
        >
          {/* ---------- List: fills the full column height on desktop ---------- */}
          <div className="order-1 flex min-w-0 flex-col lg:py-2">
            <p className="hidden px-3 pb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground lg:block">
              {hasRealReviews ? "Residents & guests" : "Explore the valley"}
            </p>
            <div
              ref={listRef}
              role="tablist"
              aria-label="Highlights"
              onKeyDown={onKeyDown}
              className={`flex gap-2 overflow-x-auto pb-1 lg:flex-1 lg:flex-col lg:justify-between lg:gap-1 lg:overflow-visible lg:pb-0 ${scrollbarless}`}
            >
              {slides.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`review-tab-${item.id}`}
                    aria-selected={on}
                    aria-controls="review-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`relative flex min-w-[10.5rem] shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors duration-300 lg:min-w-0 lg:py-3 lg:pl-9 lg:pr-4 ${on ? "" : "hover:bg-muted/60"}`}
                  >
                    {/* Highlight pill glides from item to item */}
                    {on && <motion.span layoutId="review-pill" transition={spring} aria-hidden="true" className="absolute inset-0 rounded-2xl bg-secondary/70" />}

                    {/* Vertical progress line, inset inside the pill so it never touches the avatar (desktop) */}
                    <span aria-hidden="true" className="absolute bottom-3.5 left-3.5 top-3.5 z-10 hidden w-[3px] overflow-hidden rounded-full bg-border lg:block">
                      {on && <motion.span style={{ scaleY: progress }} className="block size-full origin-top bg-primary" />}
                    </span>
                    {/* Horizontal progress line (mobile / tablet) */}
                    <span aria-hidden="true" className="absolute inset-x-4 bottom-1 z-10 h-[2px] overflow-hidden rounded-full lg:hidden">
                      {on && <motion.span style={{ scaleX: progress }} className="block size-full origin-left bg-primary" />}
                    </span>

                    <span className={`relative z-10 size-10 shrink-0 overflow-hidden rounded-full ring-2 transition-[box-shadow] duration-300 lg:size-11 ${on ? "ring-primary/40" : "ring-transparent"}`}>
                      <img src={item.image} alt="" loading="lazy" decoding="async" draggable={false} style={{ objectPosition: item.position }} className="size-full object-cover" />
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className={`block truncate text-[15px] leading-tight transition-colors ${on ? "font-medium text-foreground" : "text-foreground/80"}`}>{item.name}</span>
                      <span className="mt-0.5 hidden truncate text-sm text-muted-foreground sm:block">{item.descriptor}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------- Logo + stat + quote ---------- */}
          <div className="order-3 flex min-w-0 flex-col px-2 pb-2 pt-2 lg:order-2 lg:min-h-[640px] lg:py-3">
            <div className="flex items-center justify-between gap-4">
              <img src={tarudhanlogo} alt="Tarudhan Valley Golf Resort" width={1200} height={372} decoding="async" className="h-10 w-auto md:h-12" />
              <span className="text-sm tabular-nums text-muted-foreground">
                <span className="text-foreground">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div id="review-panel" role="tabpanel" aria-labelledby={`review-tab-${t.id}`} className="my-8 flex flex-1 flex-col justify-center md:my-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={t.id}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <p className="serif-display text-[length:clamp(4rem,9vw,7rem)] leading-[0.9] tracking-[-0.05em] text-primary">
                    <Stat slide={t} reduce={reduce} />
                  </p>
                  <p className="mt-3 text-base text-muted-foreground md:text-lg">{t.statLabel}</p>
                  <blockquote className="serif-display mt-8 max-w-2xl text-[length:clamp(1.45rem,2.5vw,2.25rem)] leading-[1.2] tracking-[-0.02em] text-foreground md:mt-10">
                    “{t.quote}”
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/40 ring-offset-2 ring-offset-card">
                  <img src={t.image} alt="" loading="lazy" decoding="async" draggable={false} style={{ objectPosition: t.position }} className="size-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-medium">{author}</p>
                  <p className="truncate text-sm text-muted-foreground">{authorRole}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" aria-label="Previous" onClick={() => go(-1)} className="flex size-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground md:size-12">
                  <ArrowLeft className="size-4" />
                </button>
                <button type="button" aria-label="Next" onClick={() => go(1)} className="flex size-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground md:size-12">
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ---------- Large image ---------- */}
          <div className="relative order-2 aspect-[4/3] min-h-[260px] overflow-hidden rounded-[1.4rem] bg-deep sm:aspect-[16/10] lg:order-3 lg:aspect-auto lg:min-h-[640px] lg:rounded-[1.75rem]">
            <AnimatePresence initial={false}>
              <motion.img
                key={t.id}
                src={t.image}
                alt={t.alt}
                draggable={false}
                loading="lazy"
                decoding="async"
                width={1200}
                height={1500}
                style={{ objectPosition: t.position }}
                initial={reduce ? false : { opacity: 0, scale: 1.14, clipPath: "inset(0 0 0 100%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0%)" }}
                exit={reduce ? undefined : { opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.1, ease: EASE }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={t.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
              >
                {t.name}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl px-2 text-center text-[12px] leading-5 text-muted-foreground">
          These lines describe the property as published by the developer and operator; they are not customer reviews. Resident and guest reviews will be added here once collected with permission. Sizes are approximate and images are illustrative.
        </p>
      </div>
    </section>
  );
}