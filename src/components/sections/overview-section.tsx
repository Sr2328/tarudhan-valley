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
    <section id="overview" className="flex min-h-[100svh] items-center overflow-hidden bg-background py-8 md:py-10">
      <div className="mx-auto w-full max-w-[1520px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end md:gap-8"
        >
          <div>
            <SectionLabel>The bigger picture</SectionLabel>
            <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-muted-foreground md:mt-4 md:text-xs">Manesar · Gurugram</p>
          </div>
          <h2 className="serif-display max-w-3xl text-[clamp(2rem,1.2rem+3.4vw,3.75rem)] leading-[1] md:justify-self-end md:text-right">
            A little further from the everyday.
          </h2>
        </motion.div>

        <div className="overview-pin mt-6 md:mt-8">
          <div className="overview-track">
            {overviewCards.map((card, i) => {
              const [num, unit] = splitValue(card.value);
              return (
                <article key={card.index} className={`overview-card ${i === 0 ? "is-active" : ""}`}>
                  <div className="ov-text">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="ov-label text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:text-xs">{card.label}</p>
                        <ArrowUpRight className="ov-arrow size-4 shrink-0 text-primary/65" />
                      </div>
                      <p className={`ov-value serif-display mt-3 text-foreground ${num.length > 5 ? "ov-value-long" : ""}`}>
                        {num}
                        {unit && <span className="ov-unit">{unit}</span>}
                      </p>
                      <p className="ov-note mt-2 text-sm font-medium text-foreground/80">{card.note}</p>
                    </div>
                    <p className="ov-desc border-t border-border/70 pt-3 text-[13px] leading-5 text-muted-foreground md:pt-4 md:text-sm md:leading-6">
                      {card.description}
                    </p>
                  </div>

                  <div className="ov-media">
                    <img src={card.image} alt={card.imageAlt} loading="lazy" draggable={false} className="ov-img" />
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-4 h-px w-full bg-border md:mt-5">
            <div className="overview-progress h-px w-0 bg-primary" />
          </div>
        </div>

        <p className="mt-3 max-w-3xl text-[11px] leading-4 text-muted-foreground md:mt-4 md:text-[12px] md:leading-5">
          Silverglades lists 65 acres for the gated golf community. Lemon Tree’s fact sheet describes its separate resort property as approximately 72 acres. Figures refer to distinct property descriptions.
        </p>
      </div>
    </section>
  );
}