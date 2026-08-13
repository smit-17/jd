import { motion } from "motion/react";
import { Globe, Instagram, Linkedin, Phone } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";
import { Magnetic } from "./Decor";
import { Parallax } from "./Motion";
import { profile } from "./data";

function Particles() {
  const bubbles = Array.from({ length: 34 });
  const colors = ["var(--gold)", "var(--gold-soft)", "var(--forest)", "var(--cream)"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((_, i) => {
        const isFeature = i % 7 === 0;
        const left = (i * 31.3 + (i % 5) * 7.7) % 100;
        const delay = (i % 12) * 0.55 + ((i * 0.11) % 0.48);
        const dur = isFeature ? 16 + (i % 4) * 2.5 : 9 + (i % 9) * 2.4;
        const size = isFeature ? 18 + (i % 5) * 5 : 4 + (i % 6) * 2.4 + (i % 3);
        const color = colors[i % colors.length];
        const opacity = isFeature ? 0.18 + (i % 3) * 0.06 : 0.28 + (i % 5) * 0.07;
        const rise = -420 - (i % 10) * 70;
        const driftStart = -60 + (i % 8) * 16;
        const driftMid = -90 + (i % 11) * 18;
        const driftEnd = -120 + (i % 13) * 19;
        const blur = isFeature ? 4 : i % 4 === 0 ? 2 : i % 5 === 0 ? 1 : 0;
        const startScale = isFeature ? 0.7 : 0.55 + (i % 4) * 0.12;
        const endScale = isFeature ? 0.45 : 0.32 + (i % 5) * 0.09;
        const zIndex = isFeature ? -1 : i % 6 === 0 ? -1 : 0;

        return (
          <span
            key={i}
            className="bubble absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: color,
              opacity: 0,
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
              ["--bubble-opacity" as string]: opacity,
              ["--rise" as string]: `${rise}px`,
              ["--drift-start" as string]: `${driftStart}px`,
              ["--drift-mid" as string]: `${driftMid}px`,
              ["--drift-end" as string]: `${driftEnd}px`,
              ["--start-scale" as string]: startScale,
              ["--end-scale" as string]: endScale,
              animation: `bubble-rise ${dur}s ease-in-out ${delay}s infinite`,
              zIndex,
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}

/** "THANK YOU" with a reveal entrance and a subtle continuous per-letter float. */
function ThankYouLetters({ text }: { text: string }) {
  return (
    <motion.span
      aria-label={text}
      className="inline-block whitespace-nowrap"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} className="inline-block align-bottom" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <span className={i % 2 === 0 ? "letter-float" : "letter-drift"} style={{ animationDelay: `${i * 0.18}s` }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Contact() {
  const { phones, website, address } = profile.contact;
  return (
    <section className="relative mx-auto max-w-[1400px] overflow-x-clip px-6 pb-10 pt-16 text-center md:px-12">
      <Eyebrow className="flex justify-center">Contact Details</Eyebrow>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        {phones.map((p, i) => (
          <Reveal key={p.number} delay={i * 0.08}>
            <a href={`tel:${p.number}`} className="group flex flex-col items-center gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
                {p.label}
              </span>
              <span className="flex items-center gap-3 font-display text-2xl font-bold text-ink">
                <span className="ring-pulse relative grid h-12 w-12 place-items-center rounded-full bg-forest text-cream transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full ring-2 ring-gold/0 transition-all duration-300 group-hover:ring-gold/70 group-hover:[box-shadow:0_0_22px_color-mix(in_oklab,var(--gold)_55%,transparent)]" />
                  <Phone className="h-5 w-5" />
                </span>
                {p.number}
              </span>
            </a>
          </Reveal>
        ))}
        <Reveal delay={0.16}>
          <a href={profile.socials.website} className="group flex flex-col items-center gap-4">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
              Website
            </span>
            <span className="lux-line font-display text-2xl font-bold text-ink">{website}</span>
          </a>
        </Reveal>
      </div>

      <Parallax speed={-26}>
        <div className="mt-14">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
            Address
          </span>
          <p className="mt-3 font-display text-lg text-forest">
            {address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>
      </Parallax>
    </section>
  );
}

export function ThankYou() {
  const links = [
    { Icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
    { Icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    { Icon: Globe, href: profile.socials.website, label: "Website" },
  ];
  return (
    <footer className="relative overflow-hidden py-20 text-center">
      <Particles />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="mx-auto mb-12 h-px w-full max-w-5xl bg-border" />

        <div className="relative inline-block">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)" }}
          />
          <h2 className="breathe font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-forest text-[clamp(3rem,12vw,10rem)]">
            <ThankYouLetters text="THANK YOU" />
          </h2>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 h-[3px] w-40 origin-center rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        <div className="mt-12 flex items-center justify-center gap-6">
          {links.map(({ Icon, href, label }, i) => (
            <Reveal key={label} delay={1 + i * 0.12}>
              <Magnetic strength={0.5}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid h-12 w-12 place-items-center rounded-full border border-border text-forest transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:scale-105 hover:border-gold hover:bg-forest hover:text-cream hover:[box-shadow:0_0_24px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6" />
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3">
          <span className="text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground/80">
            © 2026 Brijes ~ All Rights Reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
