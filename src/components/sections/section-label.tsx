/** Small uppercase eyebrow with a lime dot, shown at the top of each section. */
export function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.14em] md:text-[13px] ${light ? "text-primary-foreground" : "text-foreground"}`}>
      <span className="size-2 rounded-full bg-lime" />{children}
    </span>
  );
}
