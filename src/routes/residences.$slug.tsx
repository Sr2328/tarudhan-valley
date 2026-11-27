import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ResidenceDetail } from "../components/sections/residence-detail";
import { breadcrumbJsonLd, pageLinks, pageMeta } from "../lib/page-seo";
import { getResidence } from "@/lib/residences";
import { serializeJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/residences/$slug")({
  loader: ({ params }) => {
    const residence = getResidence(params.slug);
    if (!residence) throw notFound();
    return { residence };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { residence: r } = loaderData;
    const path = `/residences/${r.slug}`;
    return {
      meta: pageMeta({ title: r.seoTitle, description: r.seoDescription, path, image: r.image, imageAlt: r.imageAlt }),
      links: pageLinks(path),
      scripts: [
        {
          type: "application/ld+json",
          children: serializeJsonLd(
            breadcrumbJsonLd([
              { name: "Tarudhan Valley", path: "/" },
              { name: "Residences", path: "/#about" },
              { name: r.title, path },
            ]),
          ),
        },
      ],
    };
  },
  component: ResidencePage,
  notFoundComponent: ResidenceNotFound,
});

function ResidencePage() {
  const { residence } = Route.useLoaderData();
  return <ResidenceDetail residence={residence} />;
}

function ResidenceNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="serif-display text-4xl md:text-6xl">That home type isn’t here.</h1>
      <p className="text-muted-foreground">It may have moved. Head back to see every residence.</p>
      <Link to="/" className="mt-2 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground">Back to Tarudhan Valley</Link>
    </main>
  );
}