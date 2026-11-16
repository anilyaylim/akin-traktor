'use client';
/* Vertical timeline whose rail fills in red/blue as you scroll through it. */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Timeline({ rows }: { rows: string[][] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.tl2-rail i', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.tl2-row').forEach(r => ScrollTrigger.create({ trigger: r, start: 'top 68%', onEnter: () => r.classList.add('on'), onLeaveBack: () => r.classList.remove('on') }));
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div className="tl2" ref={ref}>
      <div className="tl2-rail" aria-hidden><i /></div>
      {rows.map(([y, h, t]) => (
        <div className="tl2-row" key={y}>
          <span className="tl2-dot" aria-hidden />
          <b className="mono">{y}</b>
          <div><h3 className="h3">{h}</h3><p className="muted">{t}</p></div>
        </div>
      ))}
    </div>
  );
}
