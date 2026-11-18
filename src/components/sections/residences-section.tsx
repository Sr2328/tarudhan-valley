import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { homes } from "@/lib/tarudhan-data";
import { SectionLabel } from "./section-label";

export function ResidencesSection() {
  return (
    <section id="residences" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><SectionLabel>Room to make your own</SectionLabel><h2 className="serif-display mt-4 text-5xl leading-tight md:text-7xl">Space to belong.</h2></div>
          <p className="max-w-sm pb-2 text-sm leading-6 text-muted-foreground">Studios and independent villas, set against the easy rhythm of the greens.</p>
        </div>
        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {homes.map((home, index) => (
            <motion.a key={home.number} href="#location" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.12, duration: 0.8 }} className={`home-card group relative isolate block overflow-hidden rounded-[1.25rem] bg-deep text-primary-foreground ${index === 1 ? "md:mt-10" : ""}`}>
              <img src={home.src} alt={home.alt} loading="lazy" width={912} height={1200} className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-image-scrim" />
              <div className="flex min-h-[390px] flex-col justify-between p-5 sm:min-h-[470px] md:min-h-[530px] md:p-7">
                <div className="flex justify-between"><span className="rounded-full border border-primary-foreground/50 bg-deep/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] backdrop-blur-sm">Residence {home.number}</span><span className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/45 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-4" /></span></div>
                <div><p className="text-[12px] uppercase tracking-[0.17em] text-primary-foreground/75">{home.detail}</p><h3 className="serif-display mt-2 text-4xl leading-tight md:text-[2.8rem]">{home.title}</h3></div>
              </div>
            </motion.a>
          ))}
        </div>
        <p className="mt-5 text-[12px] leading-5 text-muted-foreground">Residence imagery is illustrative. Please confirm availability and specifications with the developer.</p>
      </div>
    </section>
  );
}