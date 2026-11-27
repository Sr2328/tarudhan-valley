import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { reveal } from "@/lib/motion-variants";
import { SectionLabel } from "./section-label";

const PHONE_DISPLAY = "+91 88820 12012";
const PHONE_TEL = "+918882012012";
const WHATSAPP = "918882012012"; // TODO: confirm this number is on WhatsApp, or replace

const MAP_EMBED = "https://www.google.com/maps?q=Tarudhan+Valley+Golf+Resort,+Village+Dadu,+Haryana+122105&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Tarudhan+Valley+Golf+Resort+Village+Dadu+Haryana+122105";

const quick = [
  ["Road", "Naurangpur–Tauru Road"],
  ["Village", "Dadu"],
  ["PIN", "122105"],
] as const;

const styles = `
.loc-map {
  position: relative;
  isolation: isolate;
  height: clamp(300px, 62vw, 420px);
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  background: var(--muted);
  box-shadow: 0 30px 70px -40px rgb(8 38 24 / 0.55);
}
@media (min-width: 768px) {
  .loc-map { height: 100%; min-height: 500px; border-radius: 1.5rem; }
}
.loc-skeleton {
  position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(100deg, var(--muted) 30%, color-mix(in oklab, var(--muted) 55%, white) 50%, var(--muted) 70%);
  background-size: 200% 100%;
  animation: loc-shimmer 1.6s ease-in-out infinite;
}
@keyframes loc-shimmer { to { background-position: -200% 0; } }
.loc-iframe {
  position: absolute; inset: 0; z-index: 1;
  width: 100%; height: 100%; border: 0;
  filter: grayscale(0.3) saturate(0.95);
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s;
}
.loc-iframe.is-ready { opacity: 1; }
.loc-map:hover .loc-iframe { filter: grayscale(0) saturate(1); }

.loc-chip-card {
  position: absolute; left: 1rem; top: 1rem; z-index: 2;
  display: none; align-items: center; gap: 0.6rem;
  max-width: calc(100% - 2rem);
  padding: 0.6rem 0.95rem 0.6rem 0.6rem;
  border-radius: 9999px;
  background: rgb(250 247 240 / 0.92);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  color: #0c3b25;
  box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.45);
}
@media (min-width: 640px) { .loc-chip-card { display: flex; } }
.loc-chip-icon {
  display: flex; width: 2rem; height: 2rem; flex: none;
  align-items: center; justify-content: center;
  border-radius: 9999px; background: var(--lime); color: #0c3b25;
}

.loc-dir {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  height: 2.9rem; padding: 0 1.3rem; border-radius: 9999px;
  background: var(--background); color: var(--foreground);
  font-size: 13px; font-weight: 500;
  box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.45);
  transition: background-color 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.loc-dir:hover { background: var(--secondary); transform: translateY(-2px); }
.loc-dir-float { position: absolute; right: 1rem; bottom: 1rem; z-index: 2; display: none; }
@media (min-width: 640px) { .loc-dir-float { display: inline-flex; } }
.loc-dir-bar { width: 100%; margin-top: 0.75rem; border: 1px solid var(--border); box-shadow: none; }
@media (min-width: 640px) { .loc-dir-bar { display: none; } }

.loc-fact {
  min-width: 0; padding: 0.85rem 1rem;
  border: 1px solid var(--border); border-radius: 1rem;
  background: var(--card);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s;
}
.loc-fact:hover { transform: translateY(-3px); border-color: color-mix(in oklab, var(--primary) 35%, var(--border)); }

.loc-contact {
  position: relative; overflow: hidden;
  border-radius: 1.5rem; padding: 1.5rem;
  background: var(--deep); color: var(--primary-foreground);
}
.loc-contact::before {
  content: ""; position: absolute; right: -4rem; top: -4rem; width: 14rem; height: 14rem;
  border-radius: 9999px; pointer-events: none;
  background: radial-gradient(circle, color-mix(in oklab, var(--lime) 28%, transparent), transparent 70%);
}
@media (min-width: 640px) { .loc-contact { padding: 1.9rem; } }

.loc-btn {
  display: inline-flex; width: 100%; align-items: center; justify-content: center; gap: 0.55rem;
  height: 3.1rem; padding: 0 1.25rem; border-radius: 9999px;
  font-size: 14px; font-weight: 500;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s, color 0.3s;
}
.loc-btn:hover { transform: translateY(-2px); }
.loc-btn:active { transform: scale(0.98); }
.loc-btn-primary { background: var(--lime); color: #0c3b25; }
.loc-btn-ghost { border: 1px solid rgb(255 255 255 / 0.3); color: var(--primary-foreground); }
.loc-btn-ghost:hover { background: rgb(255 255 255 / 0.1); }
.loc-btn .loc-arrow { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.loc-btn:hover .loc-arrow { transform: translate(2px, -2px); }

@media (prefers-reduced-motion: reduce) {
  .loc-skeleton { animation: none; }
  .loc-iframe, .loc-fact, .loc-btn, .loc-dir { transition: none; }
}
`;

export function LocationSection() {
  const [ready, setReady] = useState(false);
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I'd like to plan a visit to Tarudhan Valley.")}`;

  return (
    <section id="location" className="location-section overflow-hidden bg-secondary/45 py-16 md:py-28">
      <style>{styles}</style>

      <div className="mx-auto max-w-[1520px] px-5 sm:px-8 md:px-12 lg:px-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal} className="mb-8 flex items-end justify-between gap-6 md:mb-14">
          <div className="min-w-0">
            <SectionLabel>A little outside the ordinary</SectionLabel>
            <h2 className="serif-display mt-4 text-[clamp(2.4rem,1.4rem+4.6vw,4.75rem)] leading-[1]">Find your way here.</h2>
          </div>
          <MapPin className="mb-2 hidden size-6 shrink-0 text-primary md:block" aria-hidden="true" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-stretch md:gap-12">
          {/* ---------- Left: address + contact ---------- */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="order-2 flex min-w-0 flex-col gap-6 md:order-1">
            <div>
              <span className="text-[12px] uppercase tracking-[0.17em] text-muted-foreground">The address</span>
              <address className="mt-3 max-w-md text-[15px] not-italic leading-7 text-foreground">
                Village Dadu, Tarudhan Valley Golf Resort,<br />
                Naurangpur–Tauru Road,<br />
                Bissar Akbarpur, Haryana 122105,<br />
                India.
              </address>
            </div>

            <dl className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {quick.map(([label, value]) => (
                <div key={label} className="loc-fact">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary/70">{label}</dt>
                  <dd className="serif-display mt-1 break-words text-base leading-snug">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="loc-contact">
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.16em] text-lime">Ask about a visit</p>
                <h3 className="serif-display mt-2 text-[1.9rem] leading-[1.05] sm:text-3xl">Speak with Tarudhan Valley.</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/70">Sales enquiries · Current availability · Site visits</p>

                <div className="mt-5 grid gap-2.5 min-[420px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <a href={`tel:${PHONE_TEL}`} className="loc-btn loc-btn-primary">
                    <Phone className="size-4" aria-hidden="true" /> Call now
                  </a>
                  <a href={waLink} target="_blank" rel="noreferrer" className="loc-btn loc-btn-ghost">
                    <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                  </a>
                </div>
                <a href={`tel:${PHONE_TEL}`} className="mt-4 inline-block text-sm text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline">{PHONE_DISPLAY}</a>
              </div>
            </div>
          </motion.div>

          {/* ---------- Right: map ---------- */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="order-1 min-w-0 md:order-2">
            <div className="loc-map">
              {!ready && <div className="loc-skeleton" aria-hidden="true" />}
              <iframe
                title="Map showing Tarudhan Valley Golf Resort near Village Dadu, Haryana"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setReady(true)}
                className={`loc-iframe ${ready ? "is-ready" : ""}`}
              />
              <div className="loc-chip-card">
                <span className="loc-chip-icon"><MapPin className="size-4" aria-hidden="true" /></span>
                <span className="min-w-0 truncate text-[13px] font-medium">Tarudhan Valley Golf Resort</span>
              </div>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="loc-dir loc-dir-float">
                Open directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
            {/* On phones the button sits below the map so it never covers it */}
            <a href={MAP_LINK} target="_blank" rel="noreferrer" className="loc-dir loc-dir-bar">
              <Navigation className="size-4" aria-hidden="true" /> Open directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}