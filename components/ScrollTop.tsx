'use client';
/* back-to-top button with a scroll-progress ring; sits above the assistant button, appears after the first screen */
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/catalog';
import { useQuote } from './Providers';

export default function ScrollTop({ lang }: { lang: Lang }) {
  const { lenis } = useQuote(); const [on, setOn] = useState(false); const ring = useRef<SVGCircleElement>(null);
  useEffect(() => {
    const C = 2 * Math.PI * 20;
    const upd = () => {
      const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      setOn(scrollY > innerHeight * 0.8);
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
    };
    upd(); addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); return () => { removeEventListener('scroll', upd); removeEventListener('resize', upd); };
  }, []);
  const top = () => { if (lenis.current) lenis.current.scrollTo(0, { duration: 1.2 }); else scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <button className={'totop' + (on ? ' on' : '')} onClick={top} aria-label={lang === 'tr' ? 'Yukarı çık' : 'Back to top'} tabIndex={on ? 0 : -1}>
      <svg viewBox="0 0 48 48" aria-hidden><circle cx="24" cy="24" r="20" className="tt-track" /><circle ref={ring} cx="24" cy="24" r="20" className="tt-ring" /></svg>
      <svg className="tt-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
