import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LetterReveal } from "./Reveal";
import { PhotoCarousel } from "./PhotoCarousel";
import { Parallax } from "./Motion";
import { profile } from "./data";
import gallery1 from "@/assets/bioimage1.jpeg";
import gallery2 from "@/assets/bioimage2.jpeg";
import gallery3 from "@/assets/bioimage3.jpeg";
import gallery4 from "@/assets/bioimage4.jpeg";

const images = [
  { src: gallery3, alt: "Brijes Pansuriya in a black suit at a BNI Quantum event" },
  { src: gallery1, alt: "Brijes Pansuriya portrait in a striped shirt" },
  { src: gallery4, alt: "Brijes Pansuriya at the LEPDO office desk" },
  { src: gallery2, alt: "Brijes Pansuriya speaking on stage at BNI Quantum" },
];


/** Header: fades in on load, condenses + blurs on scroll, nudges on direction. */
function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > 180 && y > last.current);
        last.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { scrolled, hidden };
}

const TAGLINE_WORDS = ["Pyaar", "•", "Passion", "•", "Purity"];

export function Hero() {
  const { scrolled, hidden } = useHeaderScroll();
  const reduced = useReducedMotion();

  return (
    <section className="relative mx-auto max-w-[1400px] overflow-x-clip px-6 pb-20 pt-6 md:px-12 md:pt-8">
      <motion.header
        className="relative z-30 flex items-center justify-between rounded-full text-forest transition-[background-color,backdrop-filter,padding,box-shadow] duration-500"
        style={{
          fontSize: scrolled ? "12px" : "13px",
          letterSpacing: "3px",
          padding: scrolled ? "8px 14px" : "10px 2px",
          backgroundColor: scrolled ? "color-mix(in oklab, var(--cream) 65%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: hidden ? 0.55 : 1, y: hidden ? -8 : 0 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.15 }}
      >
        <span className="lux-line font-semibold uppercase">Chapter</span>
        <span className="lux-line font-semibold uppercase">Bio Data</span>
      </motion.header>

      <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Parallax speed={-48}>
          <motion.div
            className="float-mobile [will-change:transform,filter]"
            initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.35 }}
          >
            <PhotoCarousel images={images} />
          </motion.div>
        </Parallax>

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
              className="hero-name block text-[clamp(2.6rem,8vw,7rem)]"
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

          {/* Pyaar • Passion • Purity — staggered word reveal, then gentle float */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.32em] text-forest/75"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: reduced ? 0 : 0.9 } } }}
          >
            {profile.tagline.map((t, i) => (
              <motion.span
                key={t}
                className="flex items-center gap-4"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                <span
                  className={reduced ? undefined : "letter-float"}
                  style={{ animationDelay: `${i * 0.5}s`, display: "inline-block" }}
                >
                  {t}
                </span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
