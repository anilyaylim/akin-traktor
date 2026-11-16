'use client';
/* App-wide client state: smooth scroll (Lenis) driving GSAP ScrollTrigger, reveal-on-scroll,
   the quote list (persisted in localStorage), toast and a custom cursor. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type QuoteLine = { code: string; qty: number };
type Ctx = {
  lines: QuoteLine[]; add: (code: string, qty?: number) => void; setQty: (code: string, qty: number) => void; remove: (code: string) => void; clear: () => void;
  has: (code: string) => boolean; count: number; open: boolean; setOpen: (b: boolean) => void; toast: (msg: string) => void; lenis: React.RefObject<Lenis | null>;
};
const QuoteCtx = createContext<Ctx | null>(null);
export const useQuote = () => { const c = useContext(QuoteCtx); if (!c) throw new Error('QuoteCtx'); return c; };

const KEY = 'akin-quote-v1';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(''); const [show, setShow] = useState(false); const tRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // smooth scroll + ScrollTrigger sync
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const l = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1.4 });
    lenis.current = l;
    l.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null; };
  }, []);
  useEffect(() => { lenis.current?.stop(); if (!open) lenis.current?.start(); }, [open]);

  // route change: scroll to top, re-arm reveals
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true }); window.scrollTo(0, 0);
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    const arm = () => document.querySelectorAll('.split:not(.in), .fade:not(.in)').forEach(el => io.observe(el));
    arm(); const mo = new MutationObserver(arm); mo.observe(document.body, { childList: true, subtree: true });
    const r = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(r); };
  }, [pathname]);

  // quote list persistence
  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setLines(JSON.parse(s)); } catch {} }, []);
  const save = (l: QuoteLine[]) => { setLines(l); try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {} };
  const toast = useCallback((m: string) => { setMsg(m); setShow(true); clearTimeout(tRef.current); tRef.current = setTimeout(() => setShow(false), 2200); }, []);
  const api = useMemo<Ctx>(() => ({
    lines, count: lines.reduce((a, b) => a + b.qty, 0), open, setOpen, toast, lenis,
    has: c => lines.some(l => l.code === c),
    add: (c, q = 1) => { const ex = lines.find(l => l.code === c); save(ex ? lines.map(l => l.code === c ? { ...l, qty: l.qty + q } : l) : [...lines, { code: c, qty: q }]); },
    setQty: (c, q) => save(q <= 0 ? lines.filter(l => l.code !== c) : lines.map(l => l.code === c ? { ...l, qty: q } : l)),
    remove: c => save(lines.filter(l => l.code !== c)),
    clear: () => save([]),
  }), [lines, open, toast]);

  return (
    <QuoteCtx.Provider value={api}>
      {children}
      <div className={'toast' + (show ? ' show' : '')} role="status" aria-live="polite"><i />{msg}</div>
      <Cursor />
    </QuoteCtx.Provider>
  );
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current!; let x = -100, y = -100, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; const t = e.target as HTMLElement; el.classList.toggle('big', !!t.closest?.('a, button, [data-cursor]')); };
    const loop = () => { cx += (x - cx) * .22; cy += (y - cy) * .22; el.style.transform = `translate3d(${cx}px,${cy}px,0)`; raf = requestAnimationFrame(loop); };
    addEventListener('pointermove', move); loop();
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cursor" aria-hidden />;
}
