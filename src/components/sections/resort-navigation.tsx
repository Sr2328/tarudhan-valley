import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TarudhanLogo from "@/assets/tarudhan-logo.webp";

const links = [
  { label: "Overview", id: "overview" },
  { label: "Residences", id: "residences" },
  { label: "Amenities", id: "amenities" },
  { label: "The course", id: "golf" },
  { label: "Gallery", id: "gallery" },
  { label: "Location", id: "location" },
] as const;

/**
 * "Hanging tab" navigation: a cream bar attached to the top edge of the hero, with concave
 * flares where it meets the edge and rounded bottom corners.
 *
 * - Hover pill that glides between links (shared layout animation)
 * - Rolling text on hover, active-section dot (scroll-spy)
 * - Bar condenses after scrolling; scroll-progress line along its bottom edge
 * - CTA with a lime circle that floods the button on hover
 * - Mobile: animated burger + full panel with staggered links
 * The header's hide-on-scroll-down / show-on-scroll-up and its entrance are handled by
 * use-resort-motion.ts (GSAP), so nothing here animates the header's own transform.
 */
export function ResortNavigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const close = () => setOpen(false);

  /* condensed state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy */
  useEffect(() => {
    const opts = { rootMargin: "-45% 0px -50% 0px" };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, opts);
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    const top = document.getElementById("top");
    const ioTop = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(null));
    }, opts);
    if (top) ioTop.observe(top);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, []);

  /* mobile panel: lock page scroll, close on Escape */
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 md:px-8">
      <div className={`nav-shell pointer-events-auto mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-4 md:px-7 ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#top" aria-label="Tarudhan Valley Golf Resort, home" className="nav-logo shrink-0" onClick={close}>
          <img src={TarudhanLogo} alt="Tarudhan Valley Golf Resort" width={1200} height={372} decoding="async" />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHover(null)}>
          {links.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onMouseEnter={() => setHover(id)}
              onFocus={() => setHover(id)}
              onBlur={() => setHover(null)}
              aria-current={active === id ? "true" : undefined}
              className={`nav-link ${active === id ? "is-active" : ""}`}
            >
              {hover === id && <motion.span layoutId="nav-hover" className="nav-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="nav-roll"><span>{label}</span><span aria-hidden="true">{label}</span></span>
              {active === id && <motion.span layoutId="nav-dot" className="nav-dot" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#location" className="nav-cta hidden sm:inline-flex">
            <span className="nav-cta-label">Arrange a visit</span>
            <span className="nav-cta-icon" aria-hidden="true"><ArrowUpRight className="size-4" /></span>
          </a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" data-open={open} className="nav-burger lg:hidden">
            <span /><span />
          </button>
        </div>

        <motion.span aria-hidden="true" className="nav-progress" style={{ scaleX: progress }} />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={close} className="pointer-events-auto fixed inset-0 -z-10 bg-deep/45 backdrop-blur-sm lg:hidden" />
            <motion.nav
              key="panel"
              id="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="nav-panel pointer-events-auto mx-auto mt-3 max-w-[1520px] p-5 lg:hidden"
            >
              <ul>
                {links.map(({ label, id }, i) => (
                  <motion.li key={id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                    <a href={`#${id}`} onClick={close} className={`nav-panel-link ${active === id ? "is-active" : ""}`}>
                      <span className="nav-panel-index">{String(i + 1).padStart(2, "0")}</span>
                      <span className="serif-display text-[1.7rem]">{label}</span>
                      <ArrowUpRight className="ml-auto size-5" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} href="#location" onClick={close} className="nav-cta mt-4 flex w-full justify-between">
                <span className="nav-cta-label">Arrange a visit</span>
                <span className="nav-cta-icon" aria-hidden="true"><ArrowUpRight className="size-4" /></span>
              </motion.a>
              <p className="mt-4 text-[12px] leading-5 text-[color:var(--nav-ink)]/60">Village Dadu, Naurangpur–Tauru Road, Manesar, Gurugram</p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}