import { Fragment, type CSSProperties } from "react";
import { SectionLabel } from "./section-label";
import Treepetals from "@/assets/21ae9ec8b47f04de9d57455e8c5f64cb.png";

const TEXT =
  "Leave the noise at the gate. Step into 65 acres of fairways, villas and open sky in Manesar — a nine-hole course by Graham Cooke, a clubhouse, a spa, and mornings that move at your pace.";

/* Words highlighted in gold */
const ACCENT = new Set(["gate.", "fairways,", "pace."]);

export function StatementSection() {
  const words = TEXT.split(" ");
  return (
    <section className="statement-section relative overflow-hidden bg-deep text-primary-foreground md:flex md:min-h-[100svh] md:items-center">
      {/* Blossom branches in the corners (gently swaying) */}
      <div aria-hidden className="blossom blossom-tl">
        <img src={Treepetals} alt="" draggable={false} className="blossom-branch" />
      </div>
      <div aria-hidden className="blossom blossom-br">
        <img src={Treepetals} alt="" draggable={false} className="blossom-branch blossom-branch-b" />
      </div>

      <div className="statement-inner relative z-10 mx-auto w-full max-w-[1000px]">
        <div className="mb-7 md:mb-10">
          <SectionLabel light>Room to reconnect</SectionLabel>
          <p className="mt-3 text-[11px] uppercase leading-5 tracking-[0.14em] text-primary-foreground/55 md:text-xs">
            At your own pace · In your own way
          </p>
        </div>

        <p className="statement-text serif-display text-[clamp(1.65rem,1.1rem+2.7vw,3.4rem)] leading-[1.14]">
          {words.map((word, index) => (
            <Fragment key={`${index}-${word}`}>
              <span className={`statement-word${ACCENT.has(word) ? " statement-accent" : ""}`}>{word}</span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}