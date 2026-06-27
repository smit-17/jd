import { useEffect, useRef, useState, type ReactNode } from "react";

/** Magnetic hover wrapper — element gently follows the cursor (desktop only). */
export function Magnetic({ children, strength = 0.4 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-300 ease-out [will-change:transform]"
    >
      {children}
    </span>
  );
}

/** Soft gold cursor glow that follows the pointer (desktop only). */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
        }
        setActive(true);
      });
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full blur-[90px] transition-opacity duration-700"
      style={{
        opacity: active ? 0.4 : 0,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--gold) 38%, transparent) 0%, transparent 70%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

function DiamondOutline({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M50 4 L96 38 L50 96 L4 38 Z M4 38 H96 M50 4 L26 38 L50 96 M50 4 L74 38 L50 96 M26 38 L74 38"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Floating decorative gold shapes scattered behind content. */
export function FloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="float-slow absolute -left-16 top-[6%] h-56 w-56 rounded-full opacity-60 blur-2xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 30%, transparent), transparent 70%)" }}
      />
      <div
        className="float-slower absolute right-[-4rem] top-[34%] h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--forest) 22%, transparent), transparent 70%)", ["--spin" as string]: "0deg" }}
      />
      <div className="float-slow absolute left-[8%] top-[48%] text-gold/25">
        <DiamondOutline size={64} />
      </div>
      <div className="float-slower absolute right-[12%] top-[64%] text-gold/20">
        <DiamondOutline size={108} />
      </div>
      <div className="float-slow absolute left-[42%] top-[80%] text-forest/15">
        <DiamondOutline size={48} />
      </div>
      <div className="spin-slow absolute -right-24 top-[12%] h-64 w-64 rounded-full border border-gold/15" />
      <div className="absolute left-[18%] top-[26%] h-px w-40 rotate-[18deg] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute right-[20%] top-[72%] h-px w-52 -rotate-[10deg] bg-gradient-to-r from-transparent via-forest/25 to-transparent" />
      <div className="float-slower absolute right-[6%] top-[44%] -rotate-90 font-display text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-forest/15">
        Pyaar • Passion • Purity
      </div>
      <div className="float-slow absolute left-[4%] top-[58%] font-serif text-[0.85rem] italic tracking-wide text-gold/20">
        Pyaar • Passion • Purity
      </div>
    </div>
  );
}
