import { ArrowUpRight } from "lucide-react";

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