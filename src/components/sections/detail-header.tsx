import { Link } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";
import { CONTACT } from "@/lib/contact";

/** Compact version of the home page's "hanging tab" bar, for inner pages. */
export function DetailHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 md:px-8">
      <div className="nav-shell pointer-events-auto mx-auto flex max-w-[1520px] items-center justify-between gap-3 px-4 md:px-7">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Back to the Tarudhan Valley home page" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors hover:bg-primary/20 sm:hidden">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link to="/" aria-label="Tarudhan Valley Golf Resort, home" className="nav-logo shrink-0">
            <img src="/images/tarudhan-logo.webp" alt="Tarudhan Valley Golf Resort" width={1200} height={372} decoding="async" />
          </Link>
        </div>

        <Link to="/" hash="about" className="hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--nav-ink)]/70 transition-colors hover:text-[color:var(--nav-ink)] sm:inline-flex">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All residences
        </Link>

        <a href={CONTACT.phoneTel} className="nav-cta inline-flex">
          <span className="nav-cta-label">Call now</span>
          <span className="nav-cta-icon" aria-hidden="true"><Phone className="size-4" /></span>
        </a>
      </div>
    </header>
  );
}