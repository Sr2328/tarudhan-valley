import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

const FIRST_DELAY = 8_000; // first appearance after landing
const REPEAT_DELAY = 30_000; // reappears this long after being closed

type Errors = { name?: string; phone?: string; email?: string };

/** TODO: connect this to your backend / form service / WhatsApp / email. */
async function submitInquiry(data: { name: string; phone: string; email: string }) {
  // Example:
  // await fetch("/api/inquiry", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  console.log("Inquiry submitted", data);
}

export function InquiryPopup() {
  const [open, setOpen] = useState(false);
  const [shownOnce, setShownOnce] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  /* Schedule the next appearance: 8s on first visit, 30s after every close.
     State lives in memory only, so a page reload restarts the cycle. */
  useEffect(() => {
    if (open || submitted) return;
    const timer = window.setTimeout(
      () => {
        setOpen(true);
        setShownOnce(true);
      },
      shownOnce ? REPEAT_DELAY : FIRST_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, [open, submitted, shownOnce]);

  /* Esc closes */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").replace(/[\s-]/g, "");
    const email = String(form.get("email") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name";
    if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    setErrors(next);
    if (Object.keys(next).length) return;

    try {
      setSending(true);
      await submitInquiry({ name, phone, email });
      setSubmitted(true);
      window.setTimeout(() => setOpen(false), 2600);
    } finally {
      setSending(false);
    }
  }

  const field =
    "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-label="Enquire about Tarudhan Valley"
          data-lenis-prevent
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[80] rounded-3xl border border-border bg-card p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px]"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>

          {submitted ? (
            <div className="flex flex-col items-start gap-3 py-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-lime text-deep">
                <Check className="size-5" />
              </span>
              <h3 className="serif-display text-2xl leading-tight">Thank you.</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Our team will call you shortly to arrange a visit.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
              <div className="pr-8">
                <h3 className="serif-display text-2xl leading-tight">Plan a visit</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  Leave your number and we'll call you back.
                </p>
              </div>

              <div>
                <input name="name" type="text" autoComplete="name" placeholder="Your name" className={field} aria-invalid={!!errors.name} />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" className={field} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div>
                <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={field} aria-invalid={!!errors.email} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-1 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Request a call back"}
              </button>
            </form>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}