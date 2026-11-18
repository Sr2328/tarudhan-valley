import { Fragment, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { amenities, faqItems, galleryImages, homes, overviewCards, projectFacts } from "@/lib/tarudhan-data";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] md:text-[13px] ${light ? "text-primary-foreground" : "text-foreground"}`}>
      <span className="size-2 rounded-full bg-lime" />{children}
    </span>
  );
}

export function ResortNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["Overview", "overview"], ["Residences", "residences"], ["Amenities", "amenities"],
    ["The course", "golf"], ["Gallery", "gallery"], ["Location", "location"],
  ];
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8 md:pt-5">
      <div className="mx-auto flex max-w-[1520px] items-center justify-between rounded-full border border-background/15 bg-deep/75 px-5 py-3.5 text-primary-foreground shadow-xl backdrop-blur-xl md:px-7">
        <a href="#top" aria-label="Tarudhan Valley home" className="group flex shrink-0 items-center gap-2.5" onClick={closeMenu}>
          <span className="serif-display flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/45 text-xl">T</span>
          <span className="flex flex-col leading-tight">
            <span className="serif-display text-lg tracking-wide">Tarudhan Valley</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70">Golf Resort · Manesar</span>
          </span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="text-[13px] text-primary-foreground/80 transition-colors hover:text-primary">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="group hidden h-10 rounded-full bg-primary px-5 text-[13px] text-primary-foreground hover:bg-primary/90 sm:inline-flex">
            <a href="#location">Arrange a visit <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </Button>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} className="flex size-10 items-center justify-center rounded-full border border-primary-foreground/30 transition-colors hover:bg-primary-foreground/10 xl:hidden">
            {menuOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} aria-label="Mobile navigation" className="mx-auto mt-2 flex max-w-[1520px] flex-col gap-1 rounded-[1.5rem] border border-primary-foreground/10 bg-deep/95 p-5 text-primary-foreground shadow-xl backdrop-blur-xl xl:hidden">
          {links.map(([label, id], index) => (
            <motion.a key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} href={`#${id}`} onClick={closeMenu} className="flex items-center justify-between border-b border-primary-foreground/10 py-3.5 text-lg">
              <span className="serif-display">{label}</span><ArrowUpRight className="size-4 text-primary/75" />
            </motion.a>
          ))}
          <a href="#location" onClick={closeMenu} className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm text-primary-foreground">Arrange a visit <ArrowUpRight className="ml-1 inline size-4" /></a>
        </motion.nav>
      )}
    </header>
  );
}

export function ResortHero() {
  return (
    <section id="top" className="grain relative isolate flex min-h-[720px] h-[100svh] max-h-[1100px] flex-col justify-end overflow-hidden bg-deep text-primary-foreground">
      <div className="absolute inset-0 -z-10 hero-image" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-hero-scrim" />
      <div aria-hidden="true" className="hero-wordmark pointer-events-none absolute inset-x-0 top-24 z-0 select-none px-2 md:top-28">tarudhan</div>
      <div className="relative mx-auto grid w-full max-w-[1520px] gap-8 px-6 pb-32 pt-40 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:pb-28 lg:px-16">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.13 } } }} className="max-w-3xl">
          <motion.div variants={reveal}><SectionLabel light>Manesar, Gurugram · Haryana</SectionLabel></motion.div>
          <motion.h1 variants={reveal} className="serif-display hero-title mt-6 max-w-4xl text-primary-foreground"><span className="sr-only">Tarudhan Valley Golf Resort, Manesar — </span>Where golf meets greenery.</motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-2xl text-base leading-[1.45] text-primary-foreground/90 md:text-xl">From studio apartments to independent 2 &amp; 3 BHK villas, Tarudhan Valley brings golf, greens and a completed gated community together in Manesar, Gurugram, with a nine-hole course by Graham Cooke.</motion.p>
          <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#residences" className="inline-flex h-[3.25rem] items-center gap-3 rounded-full bg-lime px-7 text-[15px] font-medium text-deep transition-transform duration-300 hover:-translate-y-0.5"><span className="size-2 rounded-full bg-deep" />Explore residences</a>
            <a href="#location" className="inline-flex h-[3.25rem] items-center gap-3 rounded-full border border-primary-foreground/40 bg-primary-foreground/5 px-7 text-[15px] font-medium text-primary-foreground backdrop-blur-sm transition-colors duration-300 hover:bg-primary-foreground/15"><span className="size-2 rounded-full bg-lime" />Arrange a visit</a>
          </motion.div>
          <motion.div variants={reveal} className="mt-9 flex items-center gap-3 text-xs text-primary-foreground/80">
            <span className="flex -space-x-2" aria-hidden="true">
              {["A", "S", "V"].map((letter, i) => <span key={letter} className={`flex size-8 items-center justify-center rounded-full border-2 border-primary-foreground/60 text-[12px] font-medium text-deep ${["bg-accent", "bg-primary", "bg-secondary"][i]}`}>{letter}</span>)}
            </span>
            <span><strong className="font-medium text-primary-foreground">A completed community</strong><br /><span className="text-primary-foreground/65">Ready to make your own</span></span>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="hidden gap-3 md:flex md:flex-col md:items-end">
          {[["65", "acres"], ["09", "holes"], ["141", "homes"]].map(([n, label]) => <div key={n} className="flex items-center gap-3 text-right"><span className="serif-display text-3xl">{n}</span><span className="text-[11px] uppercase tracking-[0.17em] text-primary-foreground/70">{label}</span></div>)}
        </motion.div>
      </div>
      <a href="#overview" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/75">
        <span>Take a breath</span><span className="scroll-line" aria-hidden="true" /><ArrowDown className="size-3" />
      </a>
      <div className="absolute bottom-8 right-8 hidden text-right text-[11px] uppercase leading-5 tracking-[0.15em] text-primary-foreground/70 lg:block">A quieter pace<br />a different point of view</div>
    </section>
  );
}

export function OverviewSection() {
  return (
    <section id="overview" className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div><SectionLabel>The bigger picture</SectionLabel><p className="mt-5 text-xs uppercase tracking-[0.15em] text-muted-foreground">Manesar · Gurugram</p></div>
          <h2 className="serif-display max-w-4xl text-5xl leading-[0.97] md:text-7xl">A little further from the everyday.</h2>
        </motion.div>
        <div className="overview-pin mt-14 md:mt-20">
          <div className="overview-track grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            {overviewCards.map((card) => (
              <article key={card.index} className="overview-card flex min-h-56 flex-col justify-between border border-border/80 bg-card p-5 md:min-h-[310px] md:p-6">
                <div className="flex items-center justify-between"><span className="text-[12px] tracking-[0.16em] text-muted-foreground">{card.index}</span><ArrowUpRight className="size-4 text-primary/65" /></div>
                <div><p className="text-xs text-muted-foreground">{card.label}</p><p className="serif-display mt-2 text-3xl text-foreground md:text-[2.6rem]">{card.value}</p><p className="mt-1 text-[12px] text-muted-foreground">{card.note}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-4 h-px w-full bg-border"><div className="overview-progress h-px w-0 bg-primary" /></div>
        </div>
        <p className="mt-5 max-w-3xl text-[12px] leading-5 text-muted-foreground">
          Silverglades lists 65 acres for the gated golf community. Lemon Tree’s fact sheet describes its separate resort property as approximately 72 acres. Figures refer to distinct property descriptions.
        </p>
      </div>
    </section>
  );
}

export function StatementSection() {
  const words = "A quieter kind of community, thoughtfully set among the greens of Manesar. Independent villas, a clubhouse, spa and a nine-hole course by Graham Cooke — considered living with room to slow down.".split(" ");
  return (
    <section className="statement-section relative overflow-hidden bg-deep px-6 py-24 text-primary-foreground md:flex md:min-h-[100svh] md:items-center md:py-28">
      <div className="relative mx-auto grid w-full max-w-[1320px] gap-10 md:grid-cols-[0.27fr_1fr]">
        <div className="pt-2"><SectionLabel light>Room to reconnect</SectionLabel><p className="mt-4 text-xs uppercase leading-5 tracking-[0.13em] text-primary-foreground/50">At your own pace<br />In your own way</p></div>
        <p className="statement-text serif-display max-w-4xl text-[clamp(1.75rem,3.5vw,3.4rem)] leading-[1.14]">
          {words.map((word, index) => (
            <Fragment key={`${index}-${word}`}>
              <span className="statement-word">{word}</span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

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

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeImage = selected === null ? null : galleryImages[selected];
  const moveRail = (direction: number) => railRef.current?.scrollBy({ left: direction * Math.max(300, railRef.current.clientWidth * 0.64), behavior: "smooth" });
  return (
    <section id="gallery" className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-5">
          <div><SectionLabel>A closer look</SectionLabel><h2 className="serif-display mt-4 text-5xl md:text-7xl">The valley, in view.</h2></div>
          <div className="hidden gap-2 sm:flex"><Button variant="outline" size="icon" aria-label="Scroll gallery left" onClick={() => moveRail(-1)} className="size-11 rounded-full border-border"><ChevronLeft className="size-4" /></Button><Button variant="outline" size="icon" aria-label="Scroll gallery right" onClick={() => moveRail(1)} className="size-11 rounded-full border-border"><ChevronRight className="size-4" /></Button></div>
        </div>
        <div ref={railRef} className="gallery-rail mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:mt-14 md:gap-5">
          {galleryImages.map((image, index) => (
            <button key={image.src} type="button" onClick={() => setSelected(index)} aria-label={`View image: ${image.category}`} className={`gallery-tile group relative isolate shrink-0 snap-start overflow-hidden rounded-xl bg-deep text-left ${image.shape === "gallery-wide" ? "gallery-tile-wide" : "gallery-tile-tall"}`}>
              <img src={image.src} alt={image.alt} loading="lazy" width={1536} height={1024} className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 -z-10 bg-image-scrim" />
              <span className="absolute left-4 top-4 rounded-full border border-primary-foreground/35 bg-deep/25 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">{image.category}</span>
              <span className="absolute bottom-5 right-5 flex size-10 items-center justify-center rounded-full border border-primary-foreground/55 text-primary-foreground transition-colors group-hover:bg-primary"><ArrowUpRight className="size-4" /></span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-4"><span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Tap an image to take a closer look</span><span className="text-[12px] text-muted-foreground">{galleryImages.length.toString().padStart(2, "0")} views</span></div>
      </div>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-5xl border-border bg-background p-3 sm:p-5">
          <DialogTitle className="serif-display text-2xl">{activeImage?.category ?? "Gallery"}</DialogTitle>
          <DialogDescription className="sr-only">An illustrative Tarudhan Valley gallery image.</DialogDescription>
          {activeImage && <img src={activeImage.src} alt={activeImage.alt} width={1536} height={1024} className="max-h-[75svh] w-full rounded-lg object-contain" />}
          <p className="px-1 text-[12px] leading-5 text-muted-foreground">Illustrative imagery, not a verified photograph of the property.</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function LocationSection() {
  const mapUrl = "https://www.google.com/maps?q=Tarudhan+Valley+Golf+Resort,+Village+Dadu,+Haryana+122105&output=embed";
  return (
    <section id="location" className="location-section bg-secondary/45 py-24 md:py-32">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12 lg:px-16">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div><SectionLabel>A little outside the ordinary</SectionLabel><h2 className="serif-display mt-4 text-5xl md:text-7xl">Find your way here.</h2></div>
          <MapPin className="mb-2 hidden size-6 text-primary md:block" />
        </div>
        <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-14">
          <div className="flex flex-col justify-between">
            <div><span className="text-[12px] uppercase tracking-[0.17em] text-muted-foreground">The address</span><address className="mt-4 max-w-md text-sm not-italic leading-7 text-foreground">Village Dadu, Tarudhan Valley Golf Resort,<br />Naurangpur–Tauru Road,<br />Bissar Akbarpur, Haryana 122105,<br />India.</address></div>
            <div className="mt-9 border-t border-border pt-6">
              <p className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Ask about a visit</p>
              <p className="serif-display mt-2 text-3xl">Speak with Silverglades.</p>
              <p className="mt-1 text-xs text-muted-foreground">Sales enquiries · Current availability</p>
              <Button asChild className="group mt-5 h-12 rounded-full bg-primary px-6 text-sm text-primary-foreground hover:bg-primary/90"><a href="tel:+918882012012">Call +91 88820 12012 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a></Button>
            </div>
          </div>
          <div className="map-frame relative min-h-[320px] overflow-hidden rounded-[1.25rem] border border-border bg-muted md:min-h-[430px]">
            <iframe title="Map showing Tarudhan Valley Golf Resort near Village Dadu, Haryana" src={mapUrl} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full grayscale-[0.35]" />
            <a href="https://www.google.com/maps/search/?api=1&query=Tarudhan+Valley+Golf+Resort+Village+Dadu+Haryana+122105" target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-background px-4 py-3 text-[12px] font-medium text-foreground shadow-lg transition-colors hover:bg-secondary">Open directions <ArrowUpRight className="size-3.5" /></a>
            <span className="map-pin" aria-hidden="true"><MapPin className="size-5" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

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

export function FAQSection() {
  return (
    <section className="bg-secondary/45 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1350px] gap-12 px-6 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:px-12">
        <div><SectionLabel>Here if you need us</SectionLabel><h2 className="serif-display mt-4 text-5xl leading-tight md:text-7xl">A few good things to know.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A little more detail about the community and what to expect.</p></div>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqItems.map((item, index) => <AccordionItem value={`faq-${index}`} key={item.question} className="border-border"><AccordionTrigger className="gap-4 py-5 text-left text-sm font-normal text-foreground hover:no-underline [&_svg]:hidden"><span className="flex items-center gap-4"><span className="text-[12px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{item.question}</span><span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground"><Plus className="size-3.5 group-data-[state=open]:hidden" /><Minus className="hidden size-3.5 group-data-[state=open]:block" /></span></AccordionTrigger><AccordionContent className="pb-5 pl-9 pr-8 text-sm leading-6 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
  );
}

export function InvitationSection() {
  return (
    <section className="invitation-section relative isolate overflow-hidden bg-deep px-6 py-24 text-primary-foreground md:py-36">
      <div className="invitation-image absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-image-scrim" />
      <div className="mx-auto max-w-[1200px] text-center"><SectionLabel light>A place, at your own pace</SectionLabel><h2 className="serif-display mx-auto mt-5 max-w-5xl text-6xl leading-[0.93] md:text-8xl">Experience Tarudhan Valley.</h2><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-primary-foreground/80">Discover a finished community shaped around the greens, the golf, and the simple pleasure of a little more space.</p><Button asChild className="group mt-8 h-12 rounded-full bg-primary px-6 text-sm text-primary-foreground hover:bg-primary/90"><a href="#location">Arrange a site visit <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></Button></div>
      <span className="giant-wordmark" aria-hidden="true">TARUDHAN VALLEY</span>
    </section>
  );
}

export function ResortFooter() {
  const footerLinks = [["Overview", "overview"], ["Residences", "residences"], ["Amenities", "amenities"], ["Golf", "golf"], ["Gallery", "gallery"], ["Location", "location"]];
  return (
    <footer className="bg-deep px-6 pb-8 pt-14 text-primary-foreground md:px-12 md:pt-16 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        <div className="grid gap-10 border-b border-primary-foreground/15 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <a href="#top" className="flex items-start gap-3"><span className="serif-display flex size-10 items-center justify-center rounded-full border border-primary-foreground/50 text-2xl">T</span><span><span className="serif-display block text-2xl">Tarudhan Valley</span><span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-primary-foreground/55">Golf Resort · Manesar</span></span></a>
          <div><span className="text-[11px] uppercase tracking-[0.16em] text-primary-foreground/55">Around the valley</span><nav aria-label="Footer navigation" className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">{footerLinks.map(([label, id]) => <a key={id} href={`#${id}`} className="text-xs text-primary-foreground/80 transition-colors hover:text-primary">{label}</a>)}</nav></div>
          <div><span className="text-[11px] uppercase tracking-[0.16em] text-primary-foreground/55">Plan a conversation</span><a href="tel:+918882012012" className="mt-4 flex w-fit items-center gap-2 text-sm">+91 88820 12012 <ArrowUpRight className="size-3.5 text-primary" /></a><p className="mt-2 max-w-xs text-[12px] leading-5 text-primary-foreground/55">Silverglades sales enquiry · Call to confirm current availability.</p><p className="mt-4 max-w-xs text-[12px] leading-5 text-primary-foreground/70">Village Dadu, Naurangpur–Tauru Road,<br />Bissar Akbarpur, Haryana 122105, India.</p></div>
        </div>
        <p className="serif-display overflow-hidden py-7 text-center lowercase text-[clamp(2rem,8vw,7rem)] leading-none text-primary-foreground/15 md:py-9">TARUDHAN VALLEY</p>
        <div className="flex flex-col gap-3 border-t border-primary-foreground/15 pt-5 text-[11px] leading-5 text-primary-foreground/55 md:flex-row md:items-start md:justify-between"><p className="max-w-3xl">Information is based on publicly available developer and operator sources; please verify details before purchase. Residence imagery is illustrative, and reviews are unverified placeholders.</p><span className="shrink-0">Manesar · Haryana · India</span></div>
      </div>
    </footer>
  );
}