import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Page-wide motion layer for the Tarudhan Valley showcase.
 *
 * - Lenis smooth scrolling, synced to GSAP's ticker / ScrollTrigger
 * - Hero zoom-out + scroll parallax
 * - Heading mask reveals
 * - Pinned horizontal-scroll overview
 * - Scroll-scrubbed word-by-word statement
 * - Multi-speed image parallax (residence cards, invitation)
 * - Pinned golf section with zoom
 * - "Film frame" scale-up, wordmark reveal
 * - Navbar hide / show, anchor smooth-scroll, drag-to-scroll gallery
 *
 * Everything is a no-op under prefers-reduced-motion.
 * Runs in useEffect only, so it is SSR-safe.
 */
export function useResortMotion(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(".statement-word", { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- Lenis ---------- */
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* Anchor links -> Lenis */
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: hash === "#top" ? 0 : -12, duration: 1.6 });
    };
    document.addEventListener("click", onAnchorClick);

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* ---------- Hero ---------- */
      gsap.fromTo(".hero-image", { scale: 1.28 }, { scale: 1, duration: 2.6, delay: 1.9, ease: "expo.out" });
      // Wordmark: the intro animates the inner text; the scroll effect animates its wrapper.
      // They are different elements on purpose; two tweens fighting over one element's
      // opacity is what previously left the wordmark invisible.
      gsap.from(".hero-wordmark", { yPercent: 40, opacity: 0, duration: 1.8, delay: 2.2, ease: "expo.out" });
      gsap.to(".hero-wordmark-wrap", {
        yPercent: -14,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "70% top", scrub: true },
      });
      gsap.to(".hero-image", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("#top .relative.mx-auto", {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "40% top", end: "bottom top", scrub: true },
      });

      /* ---------- Navbar hide / show ---------- */
      const header = document.querySelector<HTMLElement>("header.fixed");
      if (header) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const hide = self.direction === 1 && self.scroll() > 240;
            gsap.to(header, { yPercent: hide ? -130 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
          },
        });
        gsap.from(header, { yPercent: -130, duration: 1.1, delay: 0.4, ease: "expo.out" });
      }

      /* ---------- Heading reveals ---------- */
      gsap.utils.toArray<HTMLElement>("section h2.serif-display").forEach((h2) => {
        gsap.from(h2, {
          yPercent: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: h2, start: "top 88%", once: true },
        });
      });


      /* ---------- Residence cards: multi-speed image parallax ---------- */
      gsap.utils.toArray<HTMLElement>(".home-card").forEach((card, i) => {
        const img = card.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -8 - i * 2, scale: 1.18 },
          {
            yPercent: 8 + i * 2,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* ---------- Interlude film-frame: scale up on scroll ---------- */
      const frame = document.querySelector<HTMLElement>(".film-frame");
      if (frame) {
        gsap.fromTo(
          frame,
          { scale: 0.86, borderRadius: "3rem" },
          {
            scale: 1,
            borderRadius: "1.5rem",
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "top 25%", scrub: true },
          },
        );
        gsap.fromTo(
          frame.querySelector("img"),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      /* ---------- Invitation: parallax + wordmark ---------- */
      gsap.fromTo(
        ".invitation-image",
        { yPercent: -10, scale: 1.15 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: ".invitation-section", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.from(".giant-wordmark", {
        yPercent: 60,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".giant-wordmark", start: "top 95%", once: true },
      });

      /* ---------- Desktop-only pinned scenes ---------- */
      mm.add("(min-width: 768px)", () => {
        /* Overview — pinned horizontal scroll */
        const track = document.querySelector<HTMLElement>(".overview-track");
        const section = document.querySelector<HTMLElement>("#overview");
        if (track && section) {
          const distance = () => Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
          const cards = gsap.utils.toArray<HTMLElement>(".overview-card");
          let current = -1;
          const setActive = (idx: number) => {
            if (idx === current) return;
            current = idx;
            cards.forEach((card, i) => card.classList.toggle("is-active", i === idx));
          };
          setActive(0);
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance() + window.innerHeight * 0.4}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // The card matching scroll progress grows, turns lime and shows its full description.
              onUpdate: (self) => setActive(Math.round(self.progress * (cards.length - 1))),
            },
          });
          tl.to(track, { x: () => -distance() }, 0);
          tl.to(".overview-progress", { width: "100%" }, 0);
        }

        /* Statement — pinned, word-by-word reveal while the section is held on screen */
        gsap.to(".statement-word", {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement-section",
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        /* Golf — pinned zoom */
        const golf = document.querySelector<HTMLElement>(".golf-section");
        if (golf) {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: golf,
              start: "top top",
              end: "+=80%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          });
          tl.fromTo(".golf-image", { scale: 1 }, { scale: 1.3 }, 0);
          tl.fromTo(".golf-heading", { yPercent: 10 }, { yPercent: -8 }, 0);
        }
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(".statement-word", {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".statement-text", start: "top 80%", end: "bottom 55%", scrub: true },
        });
        // Lighter treatment on mobile: gentle parallax, no pinning.
        gsap.fromTo(
          ".golf-image",
          { scale: 1, yPercent: -5 },
          {
            scale: 1.15,
            yPercent: 5,
            ease: "none",
            scrollTrigger: { trigger: ".golf-section", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    /* ---------- Drag-to-scroll gallery (mouse) ---------- */
    const rail = document.querySelector<HTMLElement>(".gallery-rail");
    let dragging = false;
    let moved = 0;
    let startX = 0;
    let startScroll = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !rail) return;
      dragging = true;
      moved = 0;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      rail.style.scrollSnapType = "none";
    };
    const move = (e: PointerEvent) => {
      if (!dragging || !rail) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = startScroll - dx;
    };
    const up = () => {
      if (!dragging || !rail) return;
      dragging = false;
      rail.style.scrollSnapType = "";
    };
    const swallowClick = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };
    rail?.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    rail?.addEventListener("click", swallowClick, true);

    /* Refresh once images / fonts settle so pin distances are right */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => { });
    const refreshTimer = window.setTimeout(refresh, 800);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      rail?.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      rail?.removeEventListener("click", swallowClick, true);
      document.removeEventListener("click", onAnchorClick);
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);
}