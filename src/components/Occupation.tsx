import { motion } from "motion/react";
import { Eyebrow, LetterReveal, Reveal } from "./Reveal";
import { profile } from "./data";

function DiamondPattern() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="diamonds" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <path
            d="M40 8 L72 40 L40 72 L8 40 Z M8 40 H72 M40 8 V72"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diamonds)" />
    </svg>
  );
}

export function Occupation() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 py-20 md:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-14 text-cream md:px-14 md:py-20">
          <DiamondPattern />
          {/* glow */}
          <div
            aria-hidden
            className="float-slow absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)" }}
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Eyebrow>Occupation</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-black leading-[0.95] tracking-[-0.02em]">
                <span className="block">CEO &amp; Owner at</span>
                <span className="gold-gradient block">{profile.occupation.company}</span>
              </h2>

              {/* animated line drawing */}
              <svg className="mt-8 h-12 w-full max-w-md" viewBox="0 0 400 40" fill="none">
                <motion.path
                  d="M2 30 C 80 30, 90 8, 160 8 S 260 32, 320 18 L 398 18"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <div className="flex flex-col justify-center gap-4">
              {profile.occupation.badges.map((b, i) => (
                <Reveal key={b} delay={i * 0.1} y={16}>
                  <div className="hover-lift flex items-center gap-4 rounded-full border border-gold/30 bg-cream/5 px-6 py-4 backdrop-blur-sm">
                    <span className="h-2 w-2 rotate-45 bg-gold" />
                    <span className="font-display text-lg font-semibold tracking-wide text-cream">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const styleFor = (i: number) => {
  const variants = [
    "text-[clamp(3rem,12vw,9rem)] font-black text-ink",
    "text-[clamp(2.2rem,8vw,6rem)] font-semibold text-forest font-serif italic",
    "text-[clamp(3rem,13vw,10rem)] font-black text-ink",
    "text-[clamp(2rem,7vw,5.5rem)] font-serif italic text-gold",
    "text-[clamp(2.4rem,9vw,7rem)] font-black text-forest",
  ];
  return variants[i % variants.length];
};

const aligns = ["justify-start", "justify-end", "justify-center", "justify-end", "justify-start"];

export function Hobbies() {
  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 py-24 md:px-12">
      <Eyebrow>Interests</Eyebrow>
      <div className="mt-10 space-y-2 md:space-y-4">
        {profile.hobbies.map((h, i) => (
          <Reveal key={h} delay={i * 0.06} y={36}>
            <motion.div
              className={`flex ${aligns[i % aligns.length]}`}
              animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
              transition={{ duration: 6 + i, ease: "easeInOut", repeat: Infinity }}
            >
              <span
                className={`lux-line cursor-default font-display uppercase leading-[0.9] tracking-[-0.02em] transition-all duration-500 hover:tracking-[0.02em] ${styleFor(
                  i,
                )}`}
              >
                {h}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
