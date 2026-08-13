import { motion } from "motion/react";
import { Eyebrow, LetterReveal, Reveal } from "./Reveal";
import { Parallax } from "./Motion";
import { profile } from "./data";

function ChapterTitle({ n, title, accentTitle, dark }: { n: string; title: string; accentTitle?: boolean; dark?: boolean }) {
  return (
    <div>
      <Eyebrow>Chapter {n}</Eyebrow>
      <h2
        className={`mt-4 font-display font-black leading-[0.9] tracking-[-0.02em] text-[clamp(2.5rem,8vw,7rem)] ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        <LetterReveal lines={[title]} />
      </h2>
    </div>
  );
}

export function Myself() {
  const rows = [
    ["Name", profile.myself.name],
    ["Date of Birth", profile.myself.dob],
    ["Height", profile.myself.height],
    ["Weight", profile.myself.weight],
  ];
  return (
    <section className="relative mx-auto max-w-[1400px] overflow-x-clip px-6 py-20 md:px-12">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Parallax speed={-40}>
          <ChapterTitle n="01" title="Myself" />
        </Parallax>
        <div className="lg:pt-4">
          {rows.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08}>
              <div className="group flex items-end justify-between border-b border-border py-5 transition-transform duration-300 ease-out hover:translate-x-1">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
                  {k}
                </span>
                <span className="font-display text-2xl font-semibold text-forest transition-all duration-300 group-hover:tracking-[0.02em] group-hover:text-forest-light md:text-3xl">
                  {v}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Professional() {
  return (
    <section className="relative mx-auto max-w-[1400px] overflow-x-clip px-6 py-16 md:px-12">
      <div className="flex items-end justify-between">
        <Eyebrow>Chapter 02</Eyebrow>
        <Reveal delay={0.1}>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-forest/60">
            Life &amp; Work
          </span>
        </Reveal>
      </div>
      <Parallax speed={-52}>
        <h2 className="mt-4 font-display font-black leading-[0.9] tracking-[-0.03em] text-ink text-[clamp(3rem,11vw,9rem)]">
          <LetterReveal lines={["Professional"]} />
        </h2>
      </Parallax>

      <motion.div
        className="mt-6 h-px w-full origin-left bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.5fr_1fr]">
        <Eyebrow>Education &amp; Development</Eyebrow>
        <div className="space-y-10">
          {profile.education.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.1}>
              <div className="group flex gap-6 transition-transform duration-300 ease-out hover:translate-x-1">
                <span className="mt-2 font-display text-xs text-gold transition-transform duration-300 group-hover:scale-125">
                  {e.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{e.title}</h3>
                  <p className="mt-1 text-muted-foreground">{e.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
