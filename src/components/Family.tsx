import { Eyebrow, LetterReveal, Reveal } from "./Reveal";
import { profile } from "./data";

function Field({ label, value, sub, dark }: { label: string; value: string; sub?: string; dark?: boolean }) {
  return (
    <div>
      <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.34em] ${dark ? "text-gold" : "text-gold"}`}>
        {label}
      </span>
      <p className={`mt-2 font-display text-xl font-semibold md:text-2xl ${dark ? "text-cream" : "text-ink"}`}>
        {value}
      </p>
      {sub && <p className={`mt-1 text-sm ${dark ? "text-cream/55" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

export function Family() {
  const { jd, maternal } = profile.family;
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-cream">
      <div
        aria-hidden
        className="float-slower absolute right-[-6rem] top-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 26%, transparent), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <Eyebrow>Chapter 03</Eyebrow>

        {/* Block 1 — JD Family */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.82] tracking-[-0.02em] text-cream">
            <LetterReveal lines={["JD", "Family"]} />
          </h2>
          <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:pt-3">
            <Reveal><Field dark label="Native" value={jd.native} /></Reveal>
            <Reveal delay={0.05}><Field dark label="Father" value={jd.father.name} sub={jd.father.note} /></Reveal>
            <Reveal delay={0.1}><Field dark label="Mother" value={jd.mother.name} /></Reveal>
            <Reveal delay={0.15}><Field dark label="Brother" value={jd.brother.name} /></Reveal>
          </div>
        </div>

        <Reveal>
          <div className="my-16 h-px w-full bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />
        </Reveal>

        {/* Block 2 — Maternal Family (separate, three-column layout) */}
        <div className="rounded-3xl border border-gold/20 bg-cream/[0.04] p-8 backdrop-blur-sm md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            {/* Left */}
            <div>
              <Eyebrow>Maternal Family</Eyebrow>
              <h3 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.01em] text-cream">
                <LetterReveal lines={["Maternal", "Family"]} />
              </h3>
            </div>
            {/* Center */}
            <Reveal delay={0.08} className="lg:border-l lg:border-gold/15 lg:pl-10">
              <Field dark label="Uncle" value={maternal.uncle} />
            </Reveal>
            {/* Right */}
            <Reveal delay={0.16} className="lg:border-l lg:border-gold/15 lg:pl-10">
              <Field dark label="Native" value={maternal.native} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutMe() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-28 text-center md:px-12">
      <Eyebrow className="flex justify-center">Chapter 04</Eyebrow>
      <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-black tracking-[-0.02em] text-ink">
        <LetterReveal lines={["About Me"]} />
      </h2>
      <Reveal delay={0.2}>
        <p className="relative mt-10 font-serif text-[clamp(1.4rem,3.2vw,2.4rem)] leading-[1.45] text-forest">
          <span className="absolute -left-2 -top-6 font-serif text-5xl text-gold">&ldquo;</span>
          {profile.about}
          <span className="ml-1 font-serif text-5xl text-gold">&rdquo;</span>
        </p>
      </Reveal>
    </section>
  );
}
