import { SEO, SITE_NAME, SITE_URL } from "@/lib/seo";

/** Meta tags for an inner page (canonical, Open Graph, Twitter). */
export function pageMeta(opts: { title: string; description: string; path: string; image?: string; imageAlt?: string }) {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ? `${SITE_URL}${opts.image}` : SEO.image;
  const alt = opts.imageAlt ?? SEO.imageAlt;
  return [
    { title: opts.title },
    { name: "description", content: opts.description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SEO.locale },
    { property: "og:url", content: url },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];
}

export const pageLinks = (path: string) => [{ rel: "canonical", href: `${SITE_URL}${path}` }];

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}