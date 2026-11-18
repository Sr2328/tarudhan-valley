import { SectionLabel } from "./section-label";

export function GolfSection() {
  return (
    <section id="golf" className="golf-section relative isolate flex min-h-[680px] h-[92svh] max-h-[900px] items-end overflow-hidden bg-deep text-primary-foreground">
      <img src="/images/tarudhan-course.webp" alt="Illustrative golf course surrounded by mature trees and water" loading="lazy" width={1536} height={1024} className="golf-image absolute inset-0 -z-20 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-image-scrim" />
      <div className="mx-auto w-full max-w-[1520px] px-6 pb-14 pt-28 md:px-12 md:pb-20 lg:px-16">
        <SectionLabel light>The game, in good company</SectionLabel>
        <h2 className="golf-heading serif-display mt-5 max-w-4xl text-6xl leading-[0.94] md:text-8xl">Nine holes.<br /><span className="italic text-primary">A fresh perspective.</span></h2>
        <p className="mt-6 max-w-lg text-sm leading-6 text-primary-foreground/85">A considered, nine-hole course by Canadian golf architect Graham Cooke — woven into the landscape.</p>
        <div className="mt-10 flex flex-wrap gap-2.5">
          {["Nine-hole course", "Driving range", "Practice area", "Golf clubhouse"].map((label) => <span key={label} className="rounded-full border border-primary-foreground/40 bg-deep/20 px-4 py-2.5 text-[12px] text-primary-foreground backdrop-blur-sm">{label}</span>)}
        </div>
      </div>
      <span className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/75 md:block">Graham Cooke · Golf Architect</span>
    </section>
  );
}