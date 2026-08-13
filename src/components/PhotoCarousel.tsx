import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Img = { src: string; alt: string };

/** true only on phone-sized touch devices — zoom/lightbox is phone-only. */
function usePhoneViewport() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px) and (pointer: coarse)");
    const apply = () => setPhone(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return phone;
}

export function PhotoCarousel({ images }: { images: Img[] }) {
  const phone = usePhoneViewport();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (!phone) setZoom(false);
  }, [phone]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const swiped = useRef(false);
  const count = images.length;

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || zoom) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 3000);
    return () => clearInterval(id);
  }, [count, paused, zoom]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, index, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
    swiped.current = false;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      go(index + (dx < 0 ? 1 : -1));
    }
    touchX.current = null;
    touchY.current = null;
  };

  return (
    <div className="relative">
      {/* floating shadow */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] blur-2xl"
        style={{ background: "radial-gradient(60% 60% at 50% 70%, color-mix(in oklab, var(--forest) 26%, transparent), transparent)" }}
      />
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={`group relative aspect-[5/6] w-full touch-pan-y select-none overflow-hidden rounded-[1.6rem] bg-forest/5 shadow-[0_40px_90px_-30px_color-mix(in_oklab,var(--forest)_55%,transparent)] ring-1 ring-gold/25 ${phone ? "cursor-zoom-in" : ""}`}
        style={{ touchAction: "pan-y" }}
        onClick={() => {
          if (phone && !swiped.current) setZoom(true);
        }}
      >
        {/* luxury frame */}
        <div className="pointer-events-none absolute inset-3 z-20 rounded-[1.1rem] border border-gold/40 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[1.6rem] ring-1 ring-inset ring-cream/10" />

        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            className="absolute inset-0 h-full w-full object-cover [will-change:opacity,transform]"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ opacity: { duration: 0.9, ease: "easeInOut" }, scale: { duration: 3.4, ease: "easeOut" } }}
            draggable={false}
          />
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
          <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
            <button
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                go(index - 1);
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-forest backdrop-blur transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                go(index + 1);
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-forest backdrop-blur transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
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

      {/* lightbox */}
      {mounted &&
        phone &&
        createPortal(
          <AnimatePresence>
            {zoom && (
          <motion.div
            className="fixed inset-0 z-[100] flex max-w-[100vw] flex-col overflow-hidden bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* top bar */}
            <div className="relative z-20 flex shrink-0 items-center justify-between px-4 pb-2 pt-[max(0.9rem,env(safe-area-inset-top))]">
              <span className="font-display text-sm tracking-[0.3em] text-cream/80">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1 text-cream/40">/</span>
                <span className="text-cream/50">{String(count).padStart(2, "0")}</span>
              </span>
              <button
                aria-label="Close"
                onClick={() => setZoom(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-forest transition-transform hover:scale-110 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ZoomPane
              key={index}
              src={images[index].src}
              alt={images[index].alt}
              onSwipe={(dir) => go(index + dir)}
              onDismiss={() => setZoom(false)}
            />

            {/* bottom controls */}
            {count > 1 && (
              <div className="relative z-20 flex shrink-0 items-center justify-center gap-5 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                <button
                  aria-label="Previous photo"
                  onClick={() => go(index - 1)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-forest transition-transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  aria-label="Next photo"
                  onClick={() => go(index + 1)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-forest transition-transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </motion.div>
          )}
        </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

/** Pinch-to-zoom / double-tap zoom / drag-pan pane. Swipes navigate when not zoomed. */
function ZoomPane({
  src,
  alt,
  onSwipe,
  onDismiss,
}: {
  src: string;
  alt: string;
  onSwipe: (dir: number) => void;
  onDismiss: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const start = useRef({ dist: 0, scale: 1, x: 0, y: 0, px: 0, py: 0, t: 0, moved: false });
  const lastTap = useRef(0);

  const clampScale = (s: number) => Math.min(4, Math.max(1, s));

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    start.current = {
      ...start.current,
      scale,
      x: offset.x,
      y: offset.y,
      px: e.clientX,
      py: e.clientY,
      t: Date.now(),
      moved: false,
      dist: pts.length === 2 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length >= 2 && start.current.dist > 0) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      setScale(clampScale((start.current.scale * d) / start.current.dist));
      start.current.moved = true;
      return;
    }
    const dx = e.clientX - start.current.px;
    const dy = e.clientY - start.current.py;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) start.current.moved = true;
    if (scale > 1) setOffset({ x: start.current.x + dx, y: start.current.y + dy });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const p = pointers.current.get(e.pointerId);
    pointers.current.delete(e.pointerId);
    if (!p) return;
    const dx = e.clientX - start.current.px;
    const dy = e.clientY - start.current.py;

    if (scale <= 1 && start.current.moved && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      onSwipe(dx < 0 ? 1 : -1);
      return;
    }
    if (!start.current.moved) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        lastTap.current = 0;
        if (scale > 1) {
          setScale(1);
          setOffset({ x: 0, y: 0 });
        } else {
          setScale(2.2);
        }
        return;
      }
      lastTap.current = now;
    }
    if (scale <= 1 && !start.current.moved) {
      const el = wrapRef.current;
      const target = e.target as HTMLElement;
      if (el && target.tagName !== "IMG") window.setTimeout(() => onDismiss(), 260);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div
        className="flex min-h-0 max-h-full max-w-full items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full select-none rounded-xl object-contain shadow-2xl ring-1 ring-gold/30"
          draggable={false}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: pointers.current.size === 0 ? "transform 0.25s ease-out" : "none",
            cursor: scale > 1 ? "grab" : "zoom-in",
          }}
        />
      </motion.div>
    </div>
  );
}
