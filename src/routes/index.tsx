import { createFileRoute } from "@tanstack/react-router";

import {
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
import { InquiryPopup } from "@/components/sections/inquiry-popup";
import { Preloader } from "@/components/sections/preloader";
import { useResortMotion } from "@/hooks/use-resort-motion";
import { buildJsonLd, seoLinks, seoMeta, serializeJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta(),
    links: seoLinks().map((link) =>
      "fetchPriority" in link
        ? { ...link, fetchPriority: link.fetchPriority as "high" | "low" | "auto" | undefined }
        : link,
    ),
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
      <InquiryPopup />
    </>
  );
}