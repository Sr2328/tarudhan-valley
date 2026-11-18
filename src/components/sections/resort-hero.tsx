import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { reveal } from "@/lib/motion-variants";
import { SectionLabel } from "./section-label";

/**
 * The preloader curtain finishes opening at ~3.2s. Hero intro animations start a little
 * before that, so they are already moving as the curtain lifts.
 * (Keep these in sync with Preloader and the "hero" block in use-resort-motion.ts.)
 */
const INTRO_DELAY = 2.3;

const heroStats = [
  ["65", "acres"],
  ["09", "holes"],
  ["141", "homes"],
] as const;

/** Sizes the wordmark so it spans exactly the width of its container, at any screen size. */
function useFitWordmark() {
  const box = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const boxEl = box.current;
    const textEl = text.current;
    if (!boxEl || !textEl) return;

    let lastWidth = 0;
    const fit = () => {
      const target = boxEl.clientWidth;
      if (!target) return;
      textEl.style.fontSize = "100px";
      const natural = textEl.getBoundingClientRect().width; // measured at 100px
      if (!natural) return;
      textEl.style.fontSize = `${(100 * target * 0.99) / natural}px`;
      lastWidth = target;
    };

    fit();
    document.fonts?.ready.then(fit).catch(() => { });
    const ro = new ResizeObserver(() => {
      if (boxEl.clientWidth !== lastWidth) fit();
    });
    ro.observe(boxEl);
    return () => ro.disconnect();
  }, []);

  return { box, text };
}

export function ResortHero() {
  const reduce = useReducedMotion();
  const delay = reduce ? 0 : INTRO_DELAY;
  const { box, text } = useFitWordmark();

  return (
    <section id="top" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep text-primary-foreground">
      {/* Oversized photo so parallax never exposes a gap, plus scrim */}
      <div className="hero-image absolute inset-x-0 -top-[14%] -bottom-[14%] -z-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-hero-scrim" />

      {/* Wordmark: in normal flow above the content, auto-fitted to the container width */}
      <div aria-hidden="true" className="hero-wordmark-wrap mx-auto w-full max-w-[1520px] px-6 pt-28 md:px-12 md:pt-32 lg:px-16">
        <div ref={box} className="w-full">
          <span ref={text} className="hero-wordmark pointer-events-none inline-block select-none">tarudhan</span>
        </div>
      </div>

      <div className="relative mx-auto mt-auto grid w-full max-w-[1520px] gap-8 px-6 pb-10 pt-8 md:px-12 md:pb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:px-16">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }} className="max-w-3xl">
          <motion.div variants={reveal}><SectionLabel light>Manesar, Gurugram · Haryana</SectionLabel></motion.div>
          <motion.h1 variants={reveal} className="serif-display hero-title mt-5 max-w-3xl text-primary-foreground">
            <span className="sr-only">Tarudhan Valley Golf Resort, Manesar — </span>Where golf meets greenery.
          </motion.h1>
          <motion.p variants={reveal} className="mt-5 max-w-xl text-base leading-[1.5] text-primary-foreground/90 md:text-lg">
            From studio apartments to independent 2 &amp; 3 BHK villas, Tarudhan Valley brings golf, greens and a completed gated community together in Manesar, Gurugram, with a nine-hole course by Graham Cooke.
          </motion.p>
          <motion.div variants={reveal} className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#residences" className="inline-flex h-[3.1rem] items-center gap-3 rounded-full bg-lime px-6 text-[15px] font-medium text-deep transition-transform duration-300 hover:-translate-y-0.5"><span className="size-2 rounded-full bg-deep" />Explore residences</a>
            <a href="#location" className="inline-flex h-[3.1rem] items-center gap-3 rounded-full border border-primary-foreground/40 bg-primary-foreground/5 px-6 text-[15px] font-medium text-primary-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-primary-foreground/15"><span className="size-2 rounded-full bg-lime" />Arrange a visit</a>
          </motion.div>
        </motion.div>

        {/* Glass card with corner details */}
        <motion.a
          href="#residences"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card group relative block w-full max-w-[24rem] p-3 lg:w-[21rem]"
          aria-label="Explore the golf villas at Tarudhan Valley"
        >
          <span className="glass-corner glass-corner-tl" aria-hidden="true" />
          <span className="glass-corner glass-corner-tr" aria-hidden="true" />
          <span className="glass-corner glass-corner-bl" aria-hidden="true" />
          <span className="glass-corner glass-corner-br" aria-hidden="true" />

          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.05rem]">
            <img src="/images/tarudhan-villa.webp" alt="Illustrative view of a golf villa at Tarudhan Valley" width={640} height={400} loading="eager" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full bg-lime text-deep transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-4" /></span>
          </div>

          <div className="px-2 pb-1 pt-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-lime">Featured residence</p>
            <p className="serif-display mt-1.5 text-2xl text-primary-foreground">Golf villas</p>
            <p className="mt-1 text-sm text-primary-foreground/75">Studios · 2 &amp; 3 BHK · Manesar</p>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-primary-foreground/20 pt-3">
              {heroStats.map(([n, label]) => (
                <div key={label}><p className="serif-display text-xl leading-none text-primary-foreground">{n}</p><p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-primary-foreground/65">{label}</p></div>
              ))}
            </div>
          </div>
        </motion.a>
      </div>

      <a href="#overview" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/75 xl:flex">
        <span>Scroll</span><span className="scroll-line" aria-hidden="true" /><ArrowDown className="size-3" />
      </a>
    </section>
  );
}