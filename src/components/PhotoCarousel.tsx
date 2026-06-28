import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count],
  );

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 4000);
    return () => clearInterval(id);
  }, [count]);

  // Parallax on pointer move
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setParallax({ x: px * 18, y: py * 18 });
  };

  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      {/* floating shadow */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] blur-2xl"
        style={{ background: "radial-gradient(60% 60% at 50% 70%, color-mix(in oklab, var(--forest) 26%, transparent), transparent)" }}
      />
      <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[1.6rem]" style={{ borderRadius: "1.6rem" }}>
      <div
        ref={containerRef}
        onMouseMove={onMove}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="group relative aspect-[5/6] w-full touch-pan-y select-none bg-forest/5 shadow-[0_40px_90px_-30px_color-mix(in_oklab,var(--forest)_55%,transparent)] ring-1 ring-gold/25 transition-transform duration-300 ease-out [will-change:transform]"
        style={{ transform: `rotateY(${parallax.x * 0.5}deg) rotateX(${-parallax.y * 0.5}deg)`, touchAction: "pan-y" }}
      >
        {/* luxury frame */}
        <div className="pointer-events-none absolute inset-3 z-20 rounded-[1.1rem] border border-gold/40 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[1.6rem] ring-1 ring-inset ring-cream/10" />

        <AnimatePresence initial={false} mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 overflow-hidden"
            style={{ borderRadius: "1.6rem" }}
          >
            <motion.img
              src={images[index].src}
              alt={images[index].alt}
              className="h-full w-full object-cover"
              style={{ transform: `scale(1.12) translate(${parallax.x}px, ${parallax.y}px)` }}
              animate={{ scale: [1.12, 1.2] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />

        {/* counter */}
        <div className="absolute bottom-5 left-5 z-30 font-display text-sm tracking-[0.3em] text-cream">
          <span className="text-lg font-bold">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-1 text-cream/50">/</span>
          <span className="text-cream/60">{String(count).padStart(2, "0")}</span>
        </div>

        {/* arrows */}
        {count > 1 && (
          <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              aria-label="Previous photo"
              onClick={() => go(index - 1)}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-forest backdrop-blur transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next photo"
              onClick={() => go(index + 1)}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-forest backdrop-blur transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      </div>

      {/* dots */}
      {count > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === index ? 34 : 12,
                background: i === index ? "var(--gold)" : "color-mix(in oklab, var(--forest) 25%, transparent)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}