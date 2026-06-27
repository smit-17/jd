import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const letter: Variants = {
  hidden: { y: "110%", opacity: 0, rotate: 4 },
  show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.85, ease: easeOut } },
};

/**
 * Letter-by-letter reveal with masked lines. Pass an array of lines.
 * accentMap optionally marks which letter indices (per line) are gold.
 */
export function LetterReveal({
  lines,
  className,
  accent,
  delay = 0,
  once = true,
}: {
  lines: string[];
  className?: string;
  accent?: (line: number, idx: number, ch: string) => boolean;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ delayChildren: delay }}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden whitespace-nowrap pb-[0.06em]">
          {Array.from(line).map((ch, ci) => (
            <motion.span
              key={ci}
              variants={letter}
              className="inline-block"
              style={{
                whiteSpace: ch === " " ? "pre" : "normal",
                color: accent?.(li, ci, ch) ? "var(--gold)" : undefined,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <span className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold">
        <span className="h-px w-8 bg-gold/60" />
        {children}
      </span>
    </Reveal>
  );
}
