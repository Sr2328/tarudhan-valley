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

/*
 * All styling lives here as Tailwind utilities (no overview rules in styles.css).
 *
 * The scroll script (use-resort-motion.ts) finds elements through the marker classes
 * `.overview-track`, `.overview-card` and `.overview-progress`, and toggles `.is-active` on the
 * card nearest the scroll position. Those classes carry no CSS of their own: the active look is
 * driven by `[&.is-active]:` on the card and `group-[.is-active]:` on its children.
 */
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const card = [
  "overview-card group flex flex-none flex-col overflow-hidden rounded-[1.25rem]",
  "border border-border/80 bg-card opacity-70",
  "transition-[background-color,color,opacity,border-color] duration-500",
  // mobile: portrait card, text on top, image fills the rest
  "w-[min(84vw,400px)] h-[clamp(360px,calc(100svh_-_380px),540px)]",
  // tablet / desktop: landscape card, text left, image right
  "md:w-[min(78vw,940px)] md:h-[clamp(320px,calc(100svh_-_310px),480px)] md:flex-row",
  // short laptop screens: slightly smaller so nothing touches the bottom
  "[@media(min-width:768px)_and_(max-height:700px)]:h-[clamp(300px,calc(100svh_-_280px),400px)]",
  "md:[&:not(.is-active):hover]:opacity-90",
  // active card: dark green, full opacity
  "[&.is-active]:border-transparent [&.is-active]:bg-deep [&.is-active]:text-primary-foreground [&.is-active]:opacity-100",
].join(" ");

const text = "flex flex-none flex-col justify-between gap-3.5 p-4 pb-4 md:flex-[0_0_40%] md:p-7";

const media = "relative min-h-[120px] flex-1 overflow-hidden md:min-h-0";

const img = `absolute inset-0 size-full scale-[1.06] object-cover transition-transform duration-[1100ms] ${EASE} group-[.is-active]:scale-100`;

const value = [
  "ov-value serif-display mt-3 flex items-baseline gap-[0.18em] whitespace-nowrap",
  "leading-[0.95] tracking-[-0.035em] text-foreground",
  "text-[length:clamp(2.3rem,9vw,2.8rem)] md:text-[length:clamp(2.2rem,3vw,2.8rem)]",
  `transition-[font-size,color] duration-700 ${EASE}`,
  "group-[.is-active]:text-lime",
].join(" ");

const valueActive = "md:group-[.is-active]:text-[length:clamp(3rem,4.2vw,4rem)]";
const valueActiveLong = "md:group-[.is-active]:text-[length:clamp(2.3rem,3.2vw,3rem)]";

export function OverviewSection() {
  return (
    <section id="overview" className="flex min-h-[100svh] w-full items-center overflow-hidden bg-background py-8 md:py-10">
      <div className="mx-auto w-full min-w-0 max-w-[1520px] px-5 sm:px-8 md:px-12 lg:px-16">
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

        <div className="overview-pin mt-6 w-full min-w-0 max-w-full overflow-hidden md:mt-8">
          <div className="overview-track flex w-max gap-3 will-change-transform md:gap-4">
            {overviewCards.map((c, i) => {
              const [num, unit] = splitValue(c.value);
              const long = num.length > 5;
              const position = (c as { imagePosition?: string }).imagePosition;
              return (
                <article key={c.index} className={`${card} ${i === 0 ? "is-active" : ""}`}>
                  <div className={text}>
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground group-[.is-active]:text-primary-foreground/65 md:text-xs">{c.label}</p>
                        <ArrowUpRight className="size-4 shrink-0 text-primary/65 group-[.is-active]:text-lime" aria-hidden="true" />
                      </div>
                      <p className={`${value} ${long ? valueActiveLong : valueActive}`}>
                        {num}
                        {unit && <span className="text-[length:0.3em] tracking-[-0.01em] opacity-75">{unit}</span>}
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground/80 group-[.is-active]:text-primary-foreground">{c.note}</p>
                    </div>
                    <p className="line-clamp-3 border-t border-border/70 pt-3 text-[13px] leading-5 text-muted-foreground group-[.is-active]:border-primary-foreground/20 group-[.is-active]:text-primary-foreground/80 md:line-clamp-none md:pt-4 md:text-sm md:leading-6">
                      {c.description}
                    </p>
                  </div>

                  <div className={media}>
                    <img src={c.image} alt={c.alt} loading="lazy" draggable={false} style={position ? { objectPosition: position } : undefined} className={img} />
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