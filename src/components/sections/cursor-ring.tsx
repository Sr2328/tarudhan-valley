import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Custom cursor ring for fine pointers; grows over links, buttons and images. */
export function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const hot = (e.target as HTMLElement).closest("a, button, .home-card, .gallery-tile, .amenity-row");
      el.classList.toggle("is-active", Boolean(hot));
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, []);

  return <div ref={ref} className="cursor-ring" aria-hidden="true" />;
}
