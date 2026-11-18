import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TarudhanLogo from "@/assets/tarudhan-logo.webp";

/**
 * Intro screen: warm cream background, the resort logo appears as a faded, desaturated
 * ghost, then fills with its real colours (left to right) in step with the 0-100 counter.
 * Finally the cream curtain lifts to reveal the hero.
 *
 * Timing (keep in sync with INTRO_DELAY in resort-hero.tsx and the hero block in
 * use-resort-motion.ts): the curtain starts lifting at ~2.25s and is gone by ~3.35s.
 *
 * Rendered in SSR output so there is no flash of page content; <noscript> hides it
 * for visitors without JavaScript.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const progress = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = prevOverflow;
          setDone(true);
        },
      });

      // 1) ghost logo (faded, grey) eases in
      tl.fromTo(".preloader-logo", { opacity: 0, y: 14, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }, 0)
        .fromTo(".preloader-meta", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.3)
        // 2) colour fills the logo left to right, driven by the counter
        .to(
          progress,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = progress.v;
              // mask edge runs slightly past 100% so the soft edge fully leaves the logo
              logo.current?.style.setProperty("--p", `${v * 1.14}%`);
              if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, "0");
              if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
            },
          },
          0.3,
        )
        // 3) hold the finished logo, then lift the curtain
        .to(".preloader-content", { opacity: 0, y: -18, scale: 1.02, duration: 0.45, ease: "power2.in" }, "+=0.05")
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.1");
    }, root);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <>
      <noscript>
        <style>{".preloader{display:none!important}"}</style>
      </noscript>
      <div ref={root} className="preloader" role="status" aria-label="Loading Tarudhan Valley Golf Resort">
        <div className="preloader-content">
          <div ref={logo} className="preloader-logo">
            {/* faded ghost */}
            <img className="preloader-logo-ghost" src={TarudhanLogo} alt="Tarudhan Valley Golf Resort logo" width={1200} height={372} fetchPriority="high" decoding="async" />
            {/* real colours, revealed by a soft left-to-right mask */}
            <img className="preloader-logo-color" src={TarudhanLogo} alt="" aria-hidden="true" width={1200} height={372} decoding="async" />
          </div>
          <div className="preloader-meta">
            <span className="preloader-bar" aria-hidden="true"><span ref={bar} className="preloader-bar-fill" /></span>
            <div className="preloader-row">
              <span className="preloader-place">
                Tarudhan Valley · Luxury Golf Resort in Manesar
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}