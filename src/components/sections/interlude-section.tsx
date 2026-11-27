import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowDownRight, Check, ChevronDown, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { SectionLabel } from "./section-label";

const CONTACT = {
  phone: "+910000000000", // TODO: real phone number
  whatsapp: "910000000000", // TODO: country code + number, no "+"
};

const interests = ["Orchard Homes (Bali style)", "Golf Villas (2 / 3 BHK)", "Studio Apartments", "Not sure yet"] as const;

const stats = [
  ["141", "Units"],
  ["65", "Acres"],
  ["9", "Hole course"],
  ["Ready", "To move"],
] as const;

const steps = ["Share your details", "We call you back", "Plan your visit"] as const;

const labelCls = "mb-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-primary-foreground/70";
const fieldCls =
  "h-[3.1rem] w-full rounded-xl border border-white/20 bg-white/10 px-3.5 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-lime focus:bg-white/15 focus-visible:ring-2 focus-visible:ring-lime/40";

/* ------------------------------------------------------------------ glass dropdown */
function GlassSelect({ id, value, options, onChange }: { id: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, [open, close]);

  const pick = (v: string) => {
    onChange(v);
    close();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setHi(Math.max(0, options.indexOf(value)));
        return setOpen(true);
      }
      setHi((h) => (e.key === "ArrowDown" ? (h + 1) % options.length : (h - 1 + options.length) % options.length));
    }
    if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      pick(options[hi]);
    }
  };

  return (
    <div ref={wrap} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${hi}` : undefined}
        onClick={() => {
          setHi(Math.max(0, options.indexOf(value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKey}
        className={`${fieldCls} flex items-center justify-between gap-2 text-left`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`size-4 shrink-0 text-white/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-white/20 bg-[#0e1d14]/95 p-1 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.7)] backdrop-blur-xl"
        >
          {options.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHi(i)}
                onClick={() => pick(o)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-white transition-colors ${hi === i ? "bg-white/12" : ""} ${selected ? "font-medium" : "text-white/85"}`}
              >
                <span className="truncate">{o}</span>
                {selected && <Check className="size-4 shrink-0 text-lime" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ section */
export function InterludeSection() {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>(interests[0]);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid 10-digit number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const msg = [
      "Hi, I'd like to know more about Tarudhan Valley.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Interested in: ${interest}`,
      note.trim() && `Note: ${note.trim()}`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setSent(true);
  };

  const reset = () => {
    setName(""); setPhone(""); setNote(""); setInterest(interests[0]); setErrors({}); setSent(false);
  };

  return (
    <section className="bg-background px-4 py-12 md:px-8 md:py-20">
      <div className="film-frame group relative isolate mx-auto flex max-w-[1520px] items-center overflow-hidden rounded-[1.5rem] bg-deep md:min-h-[650px]">
        {/* Oversized (116% tall, shifted up 8%) so the scroll parallax never exposes the dark background */}
        <img
          src="/images/tarudhan-hero.webp"
          alt="Illustrative aerial landscape of a green golf community at sunrise"
          loading="lazy"
          width={1728}
          height={1152}
          className="absolute -top-[8%] left-0 -z-20 h-[116%] w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-image-scrim" />
        <div className="absolute inset-0 -z-10 bg-deep/35" />

        <span className="absolute right-4 top-4 hidden rounded-full border border-primary-foreground/35 bg-deep/20 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm sm:block md:right-6 md:top-6">A place to pause</span>

        <div className="grid w-full items-center gap-9 px-5 py-14 sm:px-8 md:px-12 md:py-[4.5rem] lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-16">
          {/* ---------- Welcome copy ---------- */}
          <div className="min-w-0">
            <SectionLabel light>A change of pace</SectionLabel>
            <h2 className="serif-display mt-5 text-[clamp(2.7rem,1.5rem+4.8vw,5.75rem)] leading-[0.92] text-primary-foreground">
              Live greener.<br /><span className="italic">Play better.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/85 md:text-lg">
              Welcome to Tarudhan Valley. Tell us a little about what you&apos;re looking for, and our team will personally get in touch with availability, unit types and a convenient time to visit.
            </p>

            <dl className="mt-7 grid max-w-lg grid-cols-2 gap-2.5 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/20 bg-black/25 px-3.5 py-3 backdrop-blur-md">
                  <dd className="serif-display text-2xl leading-none text-lime md:text-[1.7rem]">{value}</dd>
                  <dt className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-primary-foreground/70">{label}</dt>
                </div>
              ))}
            </dl>

            <a href="#gallery" aria-label="Explore the Tarudhan Valley gallery" className="mt-7 hidden items-center gap-3 text-sm font-medium text-primary-foreground lg:inline-flex">
              <span className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/65 transition-colors hover:bg-primary-foreground hover:text-deep"><ArrowDownRight className="size-5" /></span>
              Explore the gallery
            </a>
          </div>

          {/* ---------- Glass form ---------- */}
          <div className="w-full min-w-0 rounded-[1.5rem] border border-white/20 bg-black/40 p-5 text-primary-foreground shadow-[0_30px_70px_-24px_rgb(0_0_0/0.6)] backdrop-blur-xl sm:p-6 lg:ml-auto lg:max-w-[480px]">
            {sent ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center px-2 text-center" role="status" aria-live="polite">
                <span className="flex size-14 items-center justify-center rounded-full bg-lime text-deep"><Check className="size-7" aria-hidden="true" /></span>
                <h3 className="serif-display mt-5 text-3xl">Thank you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-primary-foreground/80">Your enquiry is ready in WhatsApp. Press send there and we&apos;ll be in touch shortly.</p>
                <button type="button" onClick={reset} className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-lime underline-offset-4 hover:underline">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-lime">Enquire now</p>
                <h3 className="serif-display mt-1.5 text-2xl leading-tight sm:text-3xl">Request a quick call</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/75">Share a few details and our team will reach out about availability, pricing and site visits.</p>

                <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor={`${uid}-name`} className={labelCls}>Full name</label>
                    <input id={`${uid}-name`} className={fieldCls} placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
                    {errors.name && <p id={`${uid}-name-err`} className="mt-1 text-xs text-red-300">{errors.name}</p>}
                  </div>
                  <div className="min-w-0">
                    <label htmlFor={`${uid}-phone`} className={labelCls}>Phone</label>
                    <input id={`${uid}-phone`} type="tel" inputMode="tel" className={fieldCls} placeholder="+91 98765 43210" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
                    {errors.phone && <p id={`${uid}-phone-err`} className="mt-1 text-xs text-red-300">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-3.5">
                  <label htmlFor={`${uid}-interest`} className={labelCls}>I&apos;m interested in</label>
                  <GlassSelect id={`${uid}-interest`} value={interest} options={interests} onChange={setInterest} />
                </div>

                <div className="mt-3.5">
                  <label htmlFor={`${uid}-note`} className={labelCls}>Message <span className="normal-case tracking-normal text-primary-foreground/45">(optional)</span></label>
                  <textarea id={`${uid}-note`} rows={2} className={`${fieldCls} h-auto resize-none py-3`} placeholder="Preferred time to call, questions…" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button type="submit" className="inline-flex h-[3.1rem] flex-1 items-center justify-center gap-2 rounded-full bg-lime text-[15px] font-medium text-deep transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
                    <MessageCircle className="size-4" aria-hidden="true" /> Send enquiry
                  </button>
                  <a href={`tel:${CONTACT.phone}`} aria-label="Call now" className="flex size-[3.1rem] shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"><Phone className="size-4" aria-hidden="true" /></a>
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="flex size-[3.1rem] shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"><MessageCircle className="size-4" aria-hidden="true" /></a>
                </div>

                <ol className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3.5">
                  {steps.map((s, i) => (
                    <li key={s} className="flex min-w-0 flex-col gap-1.5">
                      <span className="flex size-5 items-center justify-center rounded-full bg-lime/90 text-[11px] font-semibold text-deep">{i + 1}</span>
                      <span className="text-[11px] leading-4 text-primary-foreground/75 sm:text-xs">{s}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-3.5 flex items-start gap-2 text-[11px] leading-4 text-primary-foreground/55"><ShieldCheck className="mt-px size-3.5 shrink-0" aria-hidden="true" />Your details are used only to respond to this enquiry.</p>
              </form>
            )}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-3 max-w-[1520px] px-2 text-[12px] leading-5 text-muted-foreground md:px-4">Illustrative resort imagery. Photographs shown are visual concepts, not verified photographs of Tarudhan Valley.</p>
    </section>
  );
}