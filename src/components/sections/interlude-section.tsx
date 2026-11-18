import { ArrowDownRight } from "lucide-react";
import { SectionLabel } from "./section-label";

export function InterludeSection() {
  return (
    <section className="bg-background px-4 py-12 md:px-8 md:py-20">
      <div className="film-frame group relative isolate mx-auto flex min-h-[530px] max-w-[1520px] items-end overflow-hidden rounded-[1.5rem] bg-deep md:min-h-[680px]">
        <img src="/images/tarudhan-hero.webp" alt="Illustrative aerial landscape of a green golf community at sunrise" loading="lazy" width={1728} height={1152} className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 -z-10 bg-image-scrim" />
        <div className="flex w-full flex-col gap-8 p-7 md:flex-row md:items-end md:justify-between md:p-12 lg:p-16">
          <div><SectionLabel light>A change of pace</SectionLabel><h2 className="serif-display mt-5 text-6xl leading-[0.9] text-primary-foreground md:text-8xl">Live greener.<br /><span className="italic">Play better.</span></h2></div>
          <a href="#gallery" aria-label="Explore the Tarudhan Valley gallery" className="flex size-14 shrink-0 items-center justify-center self-end rounded-full border border-primary-foreground/65 text-primary-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:self-auto"><ArrowDownRight className="size-5" /></a>
        </div>
        <span className="absolute right-6 top-6 rounded-full border border-primary-foreground/35 bg-deep/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">A place to pause</span>
      </div>
      <p className="mx-auto mt-3 max-w-[1520px] px-2 text-[12px] leading-5 text-muted-foreground md:px-4">Illustrative resort imagery. Photographs shown are visual concepts, not verified photographs of Tarudhan Valley.</p>
    </section>
  );
}