import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "./section-label";

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