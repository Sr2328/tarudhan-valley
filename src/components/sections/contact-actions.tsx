import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, PhoneCall } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/contact";

const buttonBase = "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[15px] font-medium transition-transform duration-300 hover:-translate-y-0.5";

/** Strip spaces, dashes, +91 / 0 prefix and check for a valid 10-digit Indian mobile number. */
function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

/**
 * Call, WhatsApp and a quick call-back form.
 * There is no backend yet, so the call-back form hands the request to WhatsApp with the
 * message pre-written; the visitor just taps send.
 */
export function ContactPanel({ title }: { title: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  const waGeneral = whatsappLink(`Hello, I'd like details about ${title} at Tarudhan Valley.`);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    const clean = normalisePhone(phone);
    if (!clean) next.phone = "Enter a valid 10-digit mobile number.";
    setErrors(next);
    if (next.name || next.phone || !clean) return;

    const msg = `Hello, I'm ${name.trim()}. Please call me back on +91 ${clean} about ${title} at Tarudhan Valley.`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field = "h-12 w-full rounded-full border bg-white/10 px-5 text-base text-primary-foreground placeholder:text-primary-foreground/45 outline-none transition-colors focus:border-lime focus:bg-white/15";

  return (
    <div className="rounded-[1.75rem] bg-deep p-6 text-primary-foreground shadow-[0_30px_60px_-30px_rgba(8,38,24,0.7)] md:p-7">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-lime">Interested?</p>
      <h2 className="serif-display mt-2 text-3xl leading-tight">Talk to the sales team about {title}.</h2>
      <p className="mt-2 text-sm leading-6 text-primary-foreground/70">Silverglades sales enquiries. Ask about availability, pricing and a site visit.</p>

      <div className="mt-5 grid gap-3">
        <a href={CONTACT.phoneTel} className={`${buttonBase} bg-lime text-deep`}>
          <Phone className="size-4" aria-hidden="true" />
          Call {CONTACT.phoneDisplay}
        </a>
        <a href={waGeneral} target="_blank" rel="noopener noreferrer" className={`${buttonBase} border border-primary-foreground/40 bg-white/5 text-primary-foreground hover:bg-white/15`}>
          <MessageCircle className="size-4" aria-hidden="true" />
          Chat on WhatsApp
        </a>
      </div>

      <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary-foreground/50" aria-hidden="true">
        <span className="h-px flex-1 bg-primary-foreground/15" />or request a quick call<span className="h-px flex-1 bg-primary-foreground/15" />
      </div>

      <form id="callback" onSubmit={submit} noValidate className="grid scroll-mt-28 gap-3">
        <div>
          <label htmlFor="cb-name" className="sr-only">Your name</label>
          <input id="cb-name" name="name" autoComplete="name" placeholder="Your name" value={name} onChange={(e) => { setName(e.target.value); setSent(false); }} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "cb-name-err" : undefined} className={`${field} ${errors.name ? "border-destructive" : "border-primary-foreground/20"}`} />
          {errors.name && <p id="cb-name-err" className="mt-1.5 px-2 text-xs text-[#ffb4a8]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cb-phone" className="sr-only">Mobile number</label>
          <input id="cb-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Mobile number" value={phone} onChange={(e) => { setPhone(e.target.value); setSent(false); }} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "cb-phone-err" : undefined} className={`${field} ${errors.phone ? "border-destructive" : "border-primary-foreground/20"}`} />
          {errors.phone && <p id="cb-phone-err" className="mt-1.5 px-2 text-xs text-[#ffb4a8]">{errors.phone}</p>}
        </div>
        <button type="submit" className={`${buttonBase} bg-primary-foreground text-deep`}>
          <PhoneCall className="size-4" aria-hidden="true" />
          Request a quick call
        </button>
        <p className="px-2 text-xs leading-5 text-primary-foreground/55" role="status">
          {sent ? "WhatsApp has opened with your request ready. Tap send to confirm." : "This opens WhatsApp with your request ready to send."}
        </p>
      </form>
    </div>
  );
}

/** Mobile-only bar pinned to the bottom of the screen. */
export function StickyActionBar({ title }: { title: string }) {
  const wa = whatsappLink(`Hello, I'd like details about ${title} at Tarudhan Valley.`);
  const item = "flex h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a href={CONTACT.phoneTel} className={`${item} bg-primary text-primary-foreground`}><Phone className="size-4" aria-hidden="true" />Call</a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className={`${item} bg-lime text-deep`}><MessageCircle className="size-4" aria-hidden="true" />WhatsApp</a>
        <a href="#callback" className={`${item} border border-border bg-card text-foreground`}><PhoneCall className="size-4" aria-hidden="true" />Call back</a>
      </div>
    </div>
  );
}