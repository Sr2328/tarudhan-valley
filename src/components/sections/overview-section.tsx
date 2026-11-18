import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { overviewCards } from "@/lib/tarudhan-data";
import { reveal } from "@/lib/motion-variants";
import { SectionLabel } from "./section-label";

/** "65 acres" -> ["65", "acres"]; "Complete" -> ["Complete", ""] */
function splitValue(value: string): [string, string] {
  const i = value.indexOf(" ");
  return i === -1 ? [value, ""] : [value.slice(0, i), value.slice(i + 1)];
}

export function OverviewSection() {
  return (
    <section id="overview" className="overflow-hidden bg-background py-20 md:flex md:min-h-[100svh] md:items-center md:py-12">
      <div className="mx-auto w-full max-w-[1520px] px-6 md:px-12 lg:px-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div><SectionLabel>The bigger picture</SectionLabel><p className="mt-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">Manesar · Gurugram</p></div>
          <h2 className="serif-display max-w-4xl text-5xl leading-[0.97] md:text-6xl">A little further from the everyday.</h2>
        </motion.div>
        <div className="overview-pin mt-10 md:mt-10">
          <div className="overview-track grid grid-cols-1 gap-3 md:gap-4">
            {overviewCards.map((card, i) => {
              const [num, unit] = splitValue(card.value);
              return (
                <article key={card.index} className={`overview-card border border-border/80 bg-card p-3 ${i === 0 ? "is-active" : ""}`}>
                  {/* Left: text content (~30%) */}
                  <div className="ov-text flex flex-col justify-between p-2 md:p-4">
                    <div className="flex items-center justify-between">
                      <span className="ov-index text-[12px] tracking-[0.16em] text-muted-foreground">{card.index} / {String(overviewCards.length).padStart(2, "0")}</span>
                      <ArrowUpRight className="size-4 text-primary/65" />
                    </div>
                    <div className="mt-6">
                      <p className="ov-label text-xs uppercase tracking-[0.14em] text-muted-foreground">{card.label}</p>
                      <p className="ov-value serif-display mt-3 text-foreground">{num}{unit && <span className="ov-unit">{unit}</span>}</p>
                      <p className="ov-note mt-2 text-sm font-medium text-foreground/80">{card.note}</p>
                    </div>
                    <p className="ov-desc mt-6 border-t border-border/70 pt-4 text-sm leading-6 text-muted-foreground">{card.description}</p>
                  </div>

                  {/* Right: image (~70%) */}
                  <div className="ov-media">
                    <img src={card.image} alt={card.alt} loading="lazy" draggable={false} className="ov-img" />
                    <div className="bg-image-scrim pointer-events-none absolute inset-0 opacity-40" />
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-5 h-px w-full bg-border"><div className="overview-progress h-px w-0 bg-primary" /></div>
        </div>
        <p className="mt-4 max-w-3xl text-[12px] leading-5 text-muted-foreground">
          Silverglades lists 65 acres for the gated golf community. Lemon Tree’s fact sheet describes its separate resort property as approximately 72 acres. Figures refer to distinct property descriptions.
        </p>
      </div>
    </section>
  );
}