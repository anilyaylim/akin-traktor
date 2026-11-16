'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Lang } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { Arrow, Split } from '../ui';

const HeroScene = dynamic(() => import('../three/HeroScene'), { ssr: false });

export default function Hero({ lang }: { lang: Lang }) {
  const d = t(lang).hero; const sec = useRef<HTMLElement>(null); const prog = useRef(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sec.current, start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => { prog.current = s.progress; } });
      gsap.to('.hero-copy', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: sec.current, start: 'top top', end: '28% top', scrub: true } });
      gsap.fromTo('.hero-spec', { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: sec.current, start: '45% top', end: '62% top', scrub: true } });
      gsap.to('.hero-bar i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sec.current, start: 'top top', end: 'bottom bottom', scrub: true } });
    }, sec);
    requestAnimationFrame(() => document.querySelector('.hero .split')?.classList.add('in'));
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="hero">
      <div className="hero-pin">
        <div className="hero-bg" aria-hidden />
        <div className="hero-canvas"><HeroScene prog={prog} labels={d.labels} /></div>
        <div className="wrap hero-ui">
          <div className="hero-copy">
            <span className="eyebrow">{d.eyebrow}</span>
            <Split as="h1" className="h-mega" lines={d.title} />
            <p className="lead">{d.sub}</p>
            <div className="hero-cta">
              <Link href={href(lang, 'products') + '#finder'} className="btn btn-red">{d.cta1} <Arrow /></Link>
              <Link href={href(lang, 'products')} className="btn btn-ghost">{d.cta2}</Link>
            </div>
          </div>
          <div className="hero-spec">
            {[['01', d.spec[0], '565'], ['02', d.spec[1], '15'], ['03', d.spec[2], 'Ford · MF · UTB · Steyr · 50NC']].map(([n, k, v]) => (
              <div key={n}><span className="mono">{n}</span><b>{k}</b><em>{v}</em></div>
            ))}
          </div>
          <div className="hero-foot"><span className="mono">{d.scroll}</span><div className="hero-bar"><i /></div></div>
        </div>
      </div>
    </section>
  );
}
