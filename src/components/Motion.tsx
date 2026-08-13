import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Detects lower-performance devices and tags <html class="perf-lite"> so the
 * CSS animation layer can soften (never remove) its motion. Also nudges
 * scroll-linked measurements after fonts/images settle and on resize, so
 * production builds don't animate against stale positions.
 */
export function PerfMode() {
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lite =
      coarse ||
      (nav.hardwareConcurrency ?? 8) <= 4 ||
      (nav.deviceMemory ?? 8) <= 4 ||
      nav.connection?.saveData === true;
    if (lite) document.documentElement.classList.add("perf-lite");

    const refresh = () => window.dispatchEvent(new Event("resize"));
    let t = 0;
    const debounced = () => {
      window.clearTimeout(t);
      t = window.setTimeout(refresh, 150);
    };

    void document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", debounced);
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    imgs.forEach((i) => i.addEventListener("load", debounced, { once: true }));

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", debounced);
    };
  }, []);
  return null;
}

/** true when the device is touch-primary (mobile/tablet). */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setCoarse(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return coarse;
}

/**
 * Lenis-powered smooth scrolling with inertia. Disabled for reduced-motion
 * users and on touch devices (native touch scrolling is preserved).
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  useEffect(() => {
    if (reduced || coarse) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.15,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis = instance as unknown as { raf: (t: number) => void; destroy: () => void };
      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced, coarse]);

  return null;
}

/**
 * Scroll-linked parallax. `speed` is the total travel in px across the
 * element's viewport pass (negative = moves up faster than the page).
 */
export function Parallax({
  children,
  speed = -60,
  className,
  mobileFactor = 0.45,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  mobileFactor?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = reduced ? 0 : speed * (coarse ? mobileFactor : 1);
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="[will-change:transform]">
        {children}
      </motion.div>
    </div>
  );
}

/** Elegant opening sequence: a soft cream veil that fades away on load. */
export function PageIntro() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setDone(true), reduced ? 0 : 900);
    return () => clearTimeout(id);
  }, [reduced]);

  if (done) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/** Soft liquid splash trail that follows the cursor. Desktop only. */
export function CursorSplash() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || coarse) return;
    const el = layer.current;
    if (!el) return;

    const dots = Array.from({ length: 6 }, (_, i) => {
      const d = document.createElement("span");
      const size = 26 - i * 3;
      d.style.cssText = `position:fixed;left:0;top:0;width:${size}px;height:${size}px;border-radius:9999px;pointer-events:none;will-change:transform,opacity;opacity:${
        0.3 - i * 0.04
      };filter:blur(${5 + i * 2}px);background:radial-gradient(circle, color-mix(in oklab, var(--gold) 75%, transparent), transparent 70%);`;
      el.appendChild(d);
      return d;
    });

    const pos = dots.map(() => ({ x: -100, y: -100 }));
    const target = { x: -100, y: -100 };
    let raf = 0;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const loop = () => {
      let px = target.x;
      let py = target.y;
      pos.forEach((p, i) => {
        p.x += (px - p.x) * (0.28 - i * 0.03);
        p.y += (py - p.y) * (0.28 - i * 0.03);
        const size = 26 - i * 3;
        dots[i].style.transform = `translate3d(${p.x - size / 2}px, ${p.y - size / 2}px, 0)`;
        px = p.x;
        py = p.y;
      });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      dots.forEach((d) => d.remove());
    };
  }, [reduced, coarse]);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[6]" />;
}

/** Spotlight that follows the cursor inside a container (desktop only). */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || coarse) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    el.style.setProperty("--so", "1");
  };
  const onLeave = () => ref.current?.style.setProperty("--so", "0");

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: "var(--so, 0)",
          background:
            "radial-gradient(220px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in oklab, var(--gold) 16%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
