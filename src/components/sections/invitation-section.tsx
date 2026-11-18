import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "./section-label";

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