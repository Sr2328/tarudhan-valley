import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { amenities, projectFacts } from "@/lib/tarudhan-data";
import { SectionLabel } from "./section-label";

export function AmenitiesSection() {
  const [active, setActive] = useState(0);
  const item = amenities[active];
  return (
    <section id="amenities" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <SectionLabel>Make the most of the day</SectionLabel><h2 className="serif-display mt-4 text-5xl leading-tight md:text-7xl">Good days,<br />built in.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Leisure has a way of finding you here. Start with the course, and stay for everything around it.</p>
            <div className="mt-10 border-t border-border">
              {amenities.map((amenity, index) => (
                <button key={amenity.number} type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-pressed={active === index} className={`amenity-row grid w-full grid-cols-[36px_1fr_28px] items-center gap-3 border-b border-border py-4 text-left transition-colors md:py-[1.1rem] ${active === index ? "text-primary" : "text-muted-foreground"}`}>
                  <span className="text-[12px]">{amenity.number}</span><span className="serif-display text-[1.4rem] leading-tight md:text-[1.75rem]">{amenity.title}</span><ArrowUpRight className={`size-4 transition-opacity ${active === index ? "opacity-100" : "opacity-30"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="amenity-visual sticky top-28 hidden h-[620px] overflow-hidden rounded-[1.5rem] bg-deep md:block">
            <motion.img key={item.image} initial={{ opacity: 0, scale: 1.045 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} src={item.image} alt={item.alt} loading="lazy" width={1536} height={1024} className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-image-scrim" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-primary-foreground">
              <p className="text-[12px] uppercase tracking-[0.18em] text-primary-foreground/75">A little more to enjoy · {item.number}</p>
              <h3 className="serif-display mt-3 max-w-md text-4xl md:text-5xl">{item.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/80">{item.description}</p>
            </div>
            <p className="absolute right-5 top-5 rounded-full border border-primary-foreground/35 bg-deep/25 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-primary-foreground backdrop-blur-sm">{projectFacts.developer}</p>
          </div>
          <div className="grid gap-3 md:hidden">
            {amenities.map((amenity) => <article key={amenity.number} className="flex items-center gap-4 border-b border-border py-4"><img src={amenity.image} alt={amenity.alt} width={96} height={96} loading="lazy" className="size-16 shrink-0 rounded-lg object-cover" /><div><span className="text-[11px] tracking-[0.15em] text-muted-foreground">{amenity.number}</span><h3 className="serif-display text-2xl leading-tight">{amenity.title}</h3><p className="mt-1 text-xs text-muted-foreground">{amenity.description}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}