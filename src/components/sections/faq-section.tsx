import { Minus, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/lib/tarudhan-data";
import { SectionLabel } from "./section-label";

export function FAQSection() {
  return (
    <section className="bg-secondary/45 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1350px] gap-12 px-6 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:px-12">
        <div><SectionLabel>Here if you need us</SectionLabel><h2 className="serif-display mt-4 text-5xl leading-tight md:text-7xl">A few good things to know.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A little more detail about the community and what to expect.</p></div>
        <Accordion type="single" collapsible className="border-t border-border">
          {faqItems.map((item, index) => <AccordionItem value={`faq-${index}`} key={item.question} className="border-border"><AccordionTrigger className="gap-4 py-5 text-left text-sm font-normal text-foreground hover:no-underline [&_svg]:hidden"><span className="flex items-center gap-4"><span className="text-[12px] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{item.question}</span><span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground"><Plus className="size-3.5 group-data-[state=open]:hidden" /><Minus className="hidden size-3.5 group-data-[state=open]:block" /></span></AccordionTrigger><AccordionContent className="pb-5 pl-9 pr-8 text-sm leading-6 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
  );
}