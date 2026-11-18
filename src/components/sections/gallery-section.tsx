import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { galleryImages } from "@/lib/tarudhan-data";
import { SectionLabel } from "./section-label";

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