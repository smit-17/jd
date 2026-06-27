import { motion } from "motion/react";
import { Globe, Instagram, Linkedin, Phone } from "lucide-react";
import { Eyebrow, LetterReveal, Reveal } from "./Reveal";
import { Magnetic } from "./Decor";
import { profile } from "./data";

function Particles() {
  const dots = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 7) * 0.9;
        const dur = 7 + (i % 5) * 2;
        const size = 3 + (i % 3) * 2;
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-gold/60"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animation: `particle-rise ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function Contact() {
  const { phones, website, address } = profile.contact;
  return (
    <section className="relative mx-auto max-w-[1400px] px-6 pb-10 pt-20 text-center md:px-12">
      <Eyebrow className="flex justify-center">Contact Details</Eyebrow>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        {phones.map((p, i) => (
          <Reveal key={p.number} delay={i * 0.08}>
            <a
              href={`tel:${p.number}`}
              className="group flex flex-col items-center gap-4"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
                {p.label}
              </span>
              <span className="flex items-center gap-3 font-display text-2xl font-bold text-ink">
                <span className="relative grid h-12 w-12 place-items-center rounded-full bg-forest text-cream transition-transform duration-300 group-hover:scale-110">
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

      <Reveal delay={0.1}>
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
      </Reveal>
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
    <footer className="relative overflow-hidden py-24 text-center">
      <Particles />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="mx-auto mb-12 h-px w-full max-w-5xl bg-border" />

        <div className="relative inline-block">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)" }}
          />
          <h2 className="name-glow font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-forest text-[clamp(3rem,12vw,10rem)]">
            <LetterReveal lines={["THANK YOU"]} />
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
            <Reveal key={label} delay={i * 0.1}>
              <Magnetic strength={0.5}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid h-12 w-12 place-items-center rounded-full border border-border text-forest transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-forest hover:text-cream hover:[box-shadow:0_0_24px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
          © 2026 · Brijes Pansuriya
        </p>
      </div>
    </footer>
  );
}
