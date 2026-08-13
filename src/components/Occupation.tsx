import { motion, useReducedMotion } from "motion/react";
import { Eyebrow, LetterReveal, Reveal } from "./Reveal";
import { Parallax, Spotlight } from "./Motion";
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
    <section className="relative mx-auto max-w-[1400px] overflow-x-clip px-6 py-16 md:px-12">
      <Reveal>
        <Spotlight className="relative overflow-hidden rounded-3xl bg-forest px-6 py-14 text-cream md:px-14 md:py-20">
          <DiamondPattern />
          {/* glow */}
          <div
            aria-hidden
            className="float-slow absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)" }}
          />

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div style={{ perspective: "900px" }}>
              <Eyebrow>Occupation</Eyebrow>
              <motion.h2
                className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-black leading-[0.95] tracking-[-0.02em] [transform-style:preserve-3d]"
                initial={{ rotateX: 12, y: 24, opacity: 0 }}
                whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block overflow-hidden">
                  <LetterReveal lines={["CEO & Owner at"]} />
                </span>
                <span className="gold-gradient breathe block">{profile.occupation.company}</span>
              </motion.h2>


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
              <Reveal delay={profile.occupation.badges.length * 0.1} y={16}>
                <a
                  href={profile.occupation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift group flex items-center gap-4 rounded-full border border-gold/60 bg-gold/10 px-6 py-4 backdrop-blur-sm transition-all duration-500 hover:border-gold hover:bg-gold/20"
                >
                  <span className="h-2 w-2 rotate-45 bg-gold" />
                  <span className="font-display text-lg font-semibold tracking-wide text-cream">Visit LEPDO</span>
                  <span className="ml-auto transition-transform duration-500 group-hover:translate-x-1">→</span>
                </a>
              </Reveal>
            </div>

          </div>
        </Spotlight>

      </Reveal>
    </section>
  );
}

const styleFor = (i: number) => {
  const variants = [
    "text-[clamp(2.6rem,11vw,9rem)] font-black text-ink",
    "text-[clamp(2rem,7vw,6rem)] font-semibold text-forest font-serif italic",
    "text-[clamp(1.9rem,8.5vw,10rem)] font-black text-ink",
    "text-[clamp(1.9rem,6.5vw,5.5rem)] font-serif italic text-gold",
    "text-[clamp(2.2rem,8vw,7rem)] font-black text-forest",
  ];
  return variants[i % variants.length];
};

const aligns = ["justify-start", "justify-end", "justify-center", "justify-end", "justify-start"];

export function Hobbies() {
  const reduced = useReducedMotion();
  return (
    <section className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-center overflow-x-clip px-6 py-20 md:min-h-0 md:py-20 md:px-12">
      <Eyebrow>Interests</Eyebrow>
      <div className="mt-12 flex flex-1 flex-col justify-center space-y-10 md:mt-10 md:flex-none md:space-y-4">
        {profile.hobbies.map((h, i) => (
          <Parallax key={h} speed={i % 2 === 0 ? -44 : 34} mobileFactor={0.3}>
            <Reveal delay={i * 0.06} y={36}>
              <motion.div
                className={`flex ${aligns[i % aligns.length]}`}
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [0, i % 2 === 0 ? -14 : 14, 0],
                        x: [0, i % 2 === 0 ? 8 : -8, 0],
                        rotate: [-0.8, 0.8, -0.8],
                      }
                }
                transition={{ duration: 9 + i * 1.5, ease: "easeInOut", repeat: Infinity }}
                style={{ willChange: "transform" }}
              >
                <motion.span
                  whileHover={reduced ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`lux-line inline-block cursor-default font-display uppercase leading-[0.9] tracking-[0.01em] transition-all duration-500 hover:tracking-[0.04em] ${styleFor(
                    i,
                  )}`}
                  style={{ textShadow: "0 14px 40px color-mix(in oklab, var(--forest) 12%, transparent)" }}
                >
                  {h}
                </motion.span>
              </motion.div>
            </Reveal>
          </Parallax>
        ))}
      </div>
    </section>

  );
}
