import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";


const INTERVAL = 3000; // ms per review

/* PLACEHOLDERS: replace quote / name / role with real, permitted reviews.
   `stat` and `statLabel` use facts already published on the site. */
const reviews = [
  {
    id: "guest-1",
    name: "Guest",
    role: "Guest review · Placeholder",
    group: "Guest",
    stat: "2016",
    statLabel: "year the Lemon Tree resort hotel opened",
    quote: "A beautiful pace, just far enough from the city.",
    image: "/images/tarudhan-pool.webp",
    alt: "Resort pool and clubhouse",
  },
  {
    id: "guest-2",
    name: "Golfer",
    role: "Guest review · Placeholder",
    group: "Golf",
    stat: "9",
    statLabel: "holes designed by Graham Cooke",
    quote: "A weekend of fresh air, long walks and golf.",
    image: "/images/tarudhan-course.webp",
    alt: "Golf course and water at sunrise",
  },
  {
    id: "resident-1",
    name: "Resident",
    role: "Resident review · Placeholder",
    group: "Resident",
    stat: "141",
    statLabel: "homes across the community",
    quote: "A setting that makes it easy to switch off.",
    image: "/images/tarudhan-villa.webp",
    alt: "Villa opening onto landscaped grounds",
  },
  {
    id: "guest-3",
    name: "Couple",
    role: "Guest review · Placeholder",
    group: "Guest",
    stat: "65",
    statLabel: "acres of open, gated greens",
    quote: "A special place to make a little more time for each other.",
    image: "/images/tarudhan-hero.webp",
    alt: "Aerial view of fairways and residences",
  },
] as const;

export function GuestVoicesSection() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const total = reviews.length;

  /* Auto-advance only while the section is on screen */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e) setInView(e.isIntersecting);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Every 3s -> next review, loops back to the first. Manual clicks restart the timer. */
  useEffect(() => {
    if (!inView || paused) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % total), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, inView, paused, total]);

  /* Keep the active chip centred in the horizontal mobile list */
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item) return;
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.clientWidth) / 2, behavior: "smooth" });
  }, [active]);

  const t = reviews[active] ?? reviews[0];
  const go = (dir: number) => setActive((i) => (i + dir + total) % total);

  return (
    <section
      id="reviews"
      ref={rootRef}
      className="tv-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="tv-wrap">
        <div className="tv-head">
          <p className="tv-eyebrow">Notes from the valley</p>
          <div className="tv-head-row">
            <h2 className="serif-display tv-title">A place to come back to.</h2>
            <span className="tv-badge">Illustrative placeholder reviews</span>
          </div>
        </div>

        <div className="tv-card">
          {/* Reviewer list */}
          <div className="tv-side">
            <p className="tv-side-label">Residents &amp; guests</p>
            <div className="tv-list" ref={listRef} role="tablist" aria-label="Reviews">
              {reviews.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`tv-item${i === active ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="tv-avatar">{item.name[0]}</span>
                  <span className="tv-item-text">
                    <span className="tv-item-name">{item.name}</span>
                    <span className="tv-item-role">{item.role}</span>
                  </span>
                  {i === active && inView && !paused && <span key={`${active}-bar`} className="tv-bar" />}
                </button>
              ))}
            </div>
          </div>

          {/* Stat + quote */}
          <div className="tv-main">
            <div className="tv-main-top">
              <span className="tv-brand">Tarudhan Valley</span>
              <span className="tv-count">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div key={t.id} className="tv-body">
              <p className="tv-stat">{t.stat}</p>
              <p className="tv-stat-label">{t.statLabel}</p>
              <blockquote className="tv-quote">“{t.quote}”</blockquote>
            </div>

            <div className="tv-foot">
              <div className="tv-author">
                <span className="tv-avatar tv-avatar-lg">{t.name[0]}</span>
                <div>
                  <p className="tv-author-name">{t.name}</p>
                  <p className="tv-author-role">{t.role}</p>
                </div>
              </div>
              <div className="tv-arrows">
                <button type="button" aria-label="Previous review" onClick={() => go(-1)}>
                  <ArrowLeft className="size-4" />
                </button>
                <button type="button" aria-label="Next review" onClick={() => go(1)}>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="tv-media">
            <img key={t.id} src={t.image} alt={t.alt} draggable={false} className="tv-img" />
            <span className="tv-tag">{t.group}</span>
          </div>
        </div>

        <p className="tv-note">
          Sample wording only, shown as design placeholders. No customer reviews have been verified or represented as real.
        </p>
      </div>
    </section>
  );
}