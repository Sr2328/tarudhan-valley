import { Fragment } from "react";
import { SectionLabel } from "./section-label";

export function StatementSection() {
  const words = "A quieter kind of community, thoughtfully set among the greens of Manesar. Independent villas, a clubhouse, spa and a nine-hole course by Graham Cooke — considered living with room to slow down.".split(" ");
  return (
    <section className="statement-section relative overflow-hidden bg-deep px-6 py-24 text-primary-foreground md:flex md:min-h-[100svh] md:items-center md:py-28">
      <div className="relative mx-auto grid w-full max-w-[1320px] gap-10 md:grid-cols-[0.27fr_1fr]">
        <div className="pt-2"><SectionLabel light>Room to reconnect</SectionLabel><p className="mt-4 text-xs uppercase leading-5 tracking-[0.13em] text-primary-foreground/50">At your own pace<br />In your own way</p></div>
        <p className="statement-text serif-display max-w-4xl text-[clamp(1.75rem,3.5vw,3.4rem)] leading-[1.14]">
          {words.map((word, index) => (
            <Fragment key={`${index}-${word}`}>
              <span className="statement-word">{word}</span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}