import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Building2, Check, LandPlot, Palette, Ruler, Tag, type LucideIcon } from "lucide-react";
import { reveal } from "../../lib/motion-variants";
import { CONTACT, whatsappLink } from "../../lib/contact";
import { residences, type Residence, type SpecIcon } from "../../lib/residences";
import { SectionLabel } from "../sections/section-label";
import { DetailHeader } from "../sections/detail-header";
import { ContactPanel, StickyActionBar } from "./contact-actions";

const specIcons: Record<SpecIcon, LucideIcon> = {
  style: Palette,
  size: Ruler,
  plot: LandPlot,
  type: Building2,
  units: Building2,
  status: BadgeCheck,
  price: Tag,
};

const viewport = { once: true, amount: 0.2 } as const;

export function ResidenceDetail({ residence: r }: { residence: Residence }) {
  // Client-side navigation keeps the previous scroll position; start each page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [r.slug]);

  const others = residences.filter((o) => o.slug !== r.slug);
  const wa = whatsappLink(`Hello, I'd like details about ${r.title} at Tarudhan Valley.`);

  return (
    <div className="min-h-screen bg-background">
      <DetailHeader />

      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-deep text-primary-foreground">
        <motion.img
          src={r.image}
          alt={r.imageAlt}
          width={1600}
          height={1000}
          fetchPriority="high"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ objectPosition: r.imagePos }}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="bg-hero-scrim absolute inset-0 -z-10" />

        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }} className="mx-auto w-full max-w-[1520px] px-6 pb-10 pt-36 md:px-12 md:pb-16 lg:px-16">
          <motion.nav variants={reveal} aria-label="Breadcrumb" className="text-xs text-primary-foreground/70">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li><Link to="/" className="hover:text-primary-foreground">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/" hash="about" className="hover:text-primary-foreground">Residences</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-primary-foreground">{r.title}</li>
            </ol>
          </motion.nav>
          <motion.div variants={reveal} className="mt-5"><SectionLabel light>Tarudhan Valley · Manesar</SectionLabel></motion.div>
          <motion.h1 variants={reveal} className="serif-display mt-4 max-w-4xl text-[clamp(2.6rem,7.5vw,6.25rem)] leading-[0.98] tracking-[-0.035em]">{r.title}</motion.h1>
          <motion.p variants={reveal} className="mt-4 max-w-xl text-base leading-[1.5] text-primary-foreground/90 md:text-xl">{r.tagline}</motion.p>
          <motion.ul variants={reveal} className="mt-6 flex flex-wrap gap-2">
            {r.summary.map((s) => (
              <li key={s} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] backdrop-blur-md">{s}</li>
            ))}
          </motion.ul>
          <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
            <a href={CONTACT.phoneTel} className="inline-flex h-[3.1rem] items-center gap-3 rounded-full bg-lime px-6 text-[15px] font-medium text-deep transition-transform duration-300 hover:-translate-y-0.5"><span className="size-2 rounded-full bg-deep" />Call now</a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-[3.1rem] items-center gap-3 rounded-full border border-primary-foreground/40 bg-primary-foreground/5 px-6 text-[15px] font-medium backdrop-blur-sm transition-colors duration-300 hover:bg-primary-foreground/15"><span className="size-2 rounded-full bg-lime" />WhatsApp</a>
            <a href="#callback" className="hidden h-[3.1rem] items-center gap-3 rounded-full px-4 text-[15px] font-medium text-primary-foreground/85 underline-offset-4 hover:underline sm:inline-flex">Request a call back<ArrowUpRight className="size-4" aria-hidden="true" /></a>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- Body ---------------- */}
      <main className="pb-28 lg:pb-0">
        <div className="mx-auto grid max-w-[1520px] gap-12 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14 lg:px-16">
          <div className="min-w-0 space-y-14 md:space-y-20">
            {/* Key details */}
            <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={reveal} aria-labelledby="specs-heading">
              <SectionLabel>Key details</SectionLabel>
              <h2 id="specs-heading" className="serif-display mt-4 text-3xl leading-tight md:text-5xl">Size, style and the essentials.</h2>
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
                {r.specs.map((s) => {
                  const Icon = specIcons[s.icon];
                  return (
                    <div key={s.label} className="bg-card p-4 md:p-6">
                      <dt className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-primary/70"><Icon className="size-4" aria-hidden="true" />{s.label}</dt>
                      <dd className="serif-display mt-2 text-lg leading-snug md:text-2xl">{s.value}</dd>
                    </div>
                  );
                })}
              </dl>
            </motion.section>

            {/* Variants (golf villas) */}
            {r.variants && (
              <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={reveal} aria-labelledby="types-heading">
                <SectionLabel>Choose your layout</SectionLabel>
                <h2 id="types-heading" className="serif-display mt-4 text-3xl leading-tight md:text-5xl">Two villa types.</h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {r.variants.map((v) => (
                    <article key={v.name} className="rounded-[1.5rem] border border-border bg-card p-6 md:p-7">
                      <h3 className="serif-display text-3xl">{v.name}</h3>
                      <dl className="mt-5 grid gap-4">
                        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3"><dt className="text-sm text-muted-foreground">Built-up area</dt><dd className="serif-display text-xl">{v.builtUp}</dd></div>
                        <div className="flex items-baseline justify-between gap-4"><dt className="text-sm text-muted-foreground">Plot size</dt><dd className="serif-display text-xl">{v.plot}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Description */}
            <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={reveal} aria-labelledby="about-heading">
              <SectionLabel>About this home</SectionLabel>
              <h2 id="about-heading" className="serif-display mt-4 text-3xl leading-tight md:text-5xl">Made for slower, greener living.</h2>
              <div className="mt-6 max-w-2xl space-y-4 text-base leading-[1.7] text-muted-foreground md:text-lg">
                {r.description.map((p) => <p key={p}>{p}</p>)}
              </div>
            </motion.section>

            {/* Highlights */}
            <motion.section initial="hidden" whileInView="show" viewport={viewport} variants={reveal} aria-labelledby="amen-heading">
              <SectionLabel>In the community</SectionLabel>
              <h2 id="amen-heading" className="serif-display mt-4 text-3xl leading-tight md:text-5xl">Everything within the gates.</h2>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {r.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm leading-5 md:text-[15px]">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-deep"><Check className="size-3" aria-hidden="true" /></span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Gallery */}
            <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={reveal} aria-label={`${r.title} gallery`}>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {r.gallery.map((g, i) => (
                  <figure key={g.src + i} className={`group relative overflow-hidden rounded-2xl bg-deep ${i === 0 || i === 3 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"}`}>
                    <img src={g.src} alt={g.alt} loading="lazy" decoding="async" width={1200} height={900} style={{ objectPosition: g.pos }} className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                  </figure>
                ))}
              </div>
            </motion.section>

            <p className="max-w-3xl text-[12px] leading-5 text-muted-foreground">
              Sizes are approximate and indicative. Details are as shared by the developer and may change; please confirm directly with the sales team before making any decision. Images are illustrative.
            </p>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ContactPanel title={r.title} />
          </aside>
        </div>

        {/* Other home types */}
        <section aria-labelledby="others-heading" className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-[1520px] px-6 py-14 md:px-12 md:py-20 lg:px-16">
            <h2 id="others-heading" className="serif-display text-3xl md:text-5xl">Explore other homes.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link key={o.slug} to="/residences/$slug" params={{ slug: o.slug }} className="group relative block aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-deep">
                  <img src={o.image} alt={o.imageAlt} loading="lazy" decoding="async" style={{ objectPosition: o.imagePos }} className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="bg-image-scrim absolute inset-0" />
                  <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-lime text-deep transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground md:p-6">
                    <p className="serif-display text-2xl md:text-3xl">{o.title}</p>
                    <p className="mt-1 text-sm text-primary-foreground/80">{o.cardLine}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />Back to Tarudhan Valley</Link>
          </div>
        </section>
      </main>

      <StickyActionBar title={r.title} />
    </div>
  );
}