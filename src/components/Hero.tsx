import { motion } from "motion/react";
import { LetterReveal, Reveal } from "./Reveal";
import { PhotoCarousel } from "./PhotoCarousel";
import { profile } from "./data";
// import brijesOffice from "../assets/Image_2.jpeg";
// import brijesStage from "../assets/Image_4.jpeg";

const images = [
  { src: '', alt: "Brijes Pansuriya at the LEPDO office" },
  { src: '', alt: "Brijes Pansuriya presenting at a BNI Quantum event" },
];

export function Hero() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-6 md:px-12 md:pt-8">
      <header className="relative z-30 flex items-center justify-between text-forest" style={{ fontSize: "13px", letterSpacing: "3px" }}>
        <span className="font-semibold uppercase">Presenting</span>
        <span className="font-semibold uppercase">Bio Data</span>
      </header>

      <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal y={40} delay={0.15}>
          <PhotoCarousel images={images} />
        </Reveal>

        <div className="relative">
          {/* floating gold accent shape behind the name */}
          <div
            aria-hidden
            className="float-slow absolute -left-10 -top-16 -z-10 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 42%, transparent), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="spin-slow absolute -right-10 top-1/2 -z-10 h-80 w-80 rounded-full border border-gold/20"
          />

          <div className="mb-6 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-gold">
            <span className="h-px w-10 bg-gold/60" />
            Presenting
          </div>

          <h1 className="name-glow font-display font-black uppercase leading-[0.85] tracking-[-0.02em] text-forest">
            <LetterReveal
              lines={[profile.name.first, profile.name.last]}
              className="block text-[clamp(2.6rem,8vw,7rem)]"
            />
          </h1>

          {/* animated luxury underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 h-[3px] w-2/3 origin-left rounded-full"
            style={{ background: "linear-gradient(90deg, var(--gold), color-mix(in oklab, var(--gold) 20%, transparent))" }}
          />

          <Reveal delay={0.7}>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.32em] text-forest/75">
              {profile.tagline.map((t, i) => (
                <span key={t} className="flex items-center gap-4">
                  {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
