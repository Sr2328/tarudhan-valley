import { Sparkles } from "lucide-react";
import { SectionLabel } from "./section-label";

const placeholderReviews = [
  ["“A beautiful pace, just far enough from the city.”", "Guest review · Placeholder"],
  ["“A weekend of fresh air, long walks and golf.”", "Guest review · Placeholder"],
  ["“A setting that makes it easy to switch off.”", "Resident review · Placeholder"],
  ["“A special place to make a little more time for each other.”", "Guest review · Placeholder"],
];

export function GuestVoicesSection() {
  return (
    <section className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16"><SectionLabel>Notes from the valley</SectionLabel><div className="mt-4 flex flex-wrap items-end justify-between gap-5"><h2 className="serif-display text-5xl md:text-7xl">A place to come back to.</h2><span className="rounded-full border border-border px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Illustrative placeholder reviews</span></div></div>
      {[0, 1].map((row) => <div key={row} className="reviews-viewport mt-9 overflow-hidden border-y border-border py-4"><div className={`marquee-track flex w-max gap-4 ${row ? "reverse" : ""}`}>{[...placeholderReviews, ...placeholderReviews].map(([quote, source], index) => <article key={`${row}-${index}`} className="w-[min(78vw,350px)] shrink-0 border border-border/90 bg-card p-5 md:p-6"><Sparkles className="size-4 text-accent" /><p className="serif-display mt-5 min-h-16 text-2xl leading-tight">{quote}</p><p className="mt-5 border-t border-border pt-3 text-[11px] uppercase tracking-[0.13em] text-muted-foreground">{source}</p></article>)}</div></div>)}
      <p className="mx-auto mt-4 max-w-[1520px] px-6 text-[12px] text-muted-foreground md:px-12 lg:px-16">Sample wording only, shown as design placeholders. No customer reviews have been verified or represented as real.</p>
    </section>
  );
}