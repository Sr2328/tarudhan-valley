import { createFileRoute } from "@tanstack/react-router";

import {
  AboutSection,
  AmenitiesSection,
  FAQSection,
  GallerySection,
  GolfSection,
  GuestVoicesSection,
  InterludeSection,
  InvitationSection,
  LocationSection,
  OverviewSection,
  ResidencesSection,
  ResortFooter,
  ResortHero,
  ResortNavigation,
  StatementSection,
} from "@/components/sections";
import { CursorRing } from "@/components/sections/cursor-ring";
import { Preloader } from "@/components/sections/preloader";
import { useResortMotion } from "@/hooks/use-resort-motion";
import { buildJsonLd, seoLinks, seoMeta, serializeJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta(),
    links: seoLinks().map((link) => ({
      ...link,
      fetchPriority:
        "fetchPriority" in link
          ? (link.fetchPriority as "high" | "low" | "auto" | undefined)
          : undefined,
    })),
    scripts: [{ type: "application/ld+json", children: serializeJsonLd(buildJsonLd()) }],
  }),
  component: Index,
});

function Index() {
  useResortMotion();

  return (
    <>
      <Preloader />
      <CursorRing />
      <ResortNavigation />
      <main>
        <ResortHero />
        <AboutSection />
        <OverviewSection />
        <StatementSection />
        <ResidencesSection />
        <AmenitiesSection />
        <GolfSection />
        <InterludeSection />
        <GallerySection />
        <LocationSection />
        <GuestVoicesSection />
        <FAQSection />
        <InvitationSection />
      </main>
      <ResortFooter />
    </>
  );
}