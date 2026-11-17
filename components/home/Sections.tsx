'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, STATS, SYSTEMS, type Lang, type SystemId } from '@/lib/catalog';
import { CONTACT, href, t } from '@/lib/i18n';
import { Arrow, Split, SysIcon, WaIcon } from '../ui';

const Finder = dynamic(() => import('../Finder'), { ssr: false });

/** mounts children only once the block comes near the viewport (keeps WebGL contexts lazy) */
export function Lazy({ children, h = 600 }: { children: React.ReactNode; h?: number | string }) {
  const ref = useRef<HTMLDivElement>(null); const [on, setOn] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: '400px' }); io.observe(ref.current!); return () => io.disconnect(); }, []);
  return <div ref={ref} style={{ minHeight: on ? undefined : h }}>{on && children}</div>;
}

/** compatible brands with example model series (the numbers are tractor model names, e.g. Fiat 480) */
export function Marquee({ lang = 'tr' }: { lang?: Lang }) {
  const items: [string, string][] = [['Ford', ''], ['Massey Ferguson', ''], ['Fiat', '480 · 540 · 640'], ['Fiat', '55.46 · 70.56'], ['New Holland', 'TT50 · TD95'], ['UTB', ''], ['Steyr', ''], ['Tümosan', ''], ['50NC', '']];
  return (
    <div className="marquee-w">
      <div className="wrap marquee-l"><span className="eyebrow">{lang === 'tr' ? 'Parça sağladığımız marka ve modeller' : 'Brands and model series we supply'}</span></div>
      <div className="marquee" aria-hidden><div className="marquee-t">{[...items, ...items].map(([b, m], i) => <span key={i}>{b}{m && <small>{lang === 'tr' ? 'modeller' : 'models'} {m}</small>}</span>)}</div></div>
    </div>
  );
}

function Count({ to, pad = 0 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!; const o = { v: 0 };
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; io.disconnect();
      gsap.to(o, { v: to, duration: 2.2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('tr-TR').padStart(pad, '0'); } }); }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to, pad]);
  return <span ref={ref}>0</span>;
}

export function Stats({ lang }: { lang: Lang }) {
  const d = t(lang).stats;
  const vals: [number, string][] = [[STATS.since, ''], [STATS.skus, ''], [STATS.groups, ''], [STATS.customers, '+'], [STATS.staff, '+']];
  return (
    <section className="section stats">
      <div className="wrap">
        <span className="eyebrow">{d.title}</span>
        <div className="stats-row">
          {vals.map(([v, s], i) => (
            <div key={i} className="stat fade" style={{ transitionDelay: i * 80 + 'ms' }}>
              <b className="mono">{i === 0 ? v : <Count to={v} />}{s}</b><span>{d.items[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Systems({ lang }: { lang: Lang }) {
  const d = t(lang).systems;
  const ids = Object.keys(SYSTEMS) as SystemId[];
  const cnt = (s: SystemId) => PRODUCTS.filter(p => p.system === s).length;
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={d.title} /></div>
          <p className="lead fade">{d.sub}</p>
        </div>
        <div className="bento">
          {ids.map((s, i) => (
            <Link key={s} href={href(lang, 'finder') + `?s=${s}`} className={'bento-c fade b' + i} style={{ transitionDelay: (i % 4) * 70 + 'ms' }}>
              <span className="bento-ic"><SysIcon id={s} /></span>
              <span className="bento-n mono">{String(cnt(s)).padStart(3, '0')} <small>{d.count}</small></span>
              <h3 className="h3">{SYSTEMS[s][lang]}</h3>
              <p className="muted">{SYSTEMS[s][lang === 'tr' ? 'trD' : 'enD']}</p>
              <span className="bento-go"><Arrow /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinderTeaser({ lang }: { lang: Lang }) {
  const d = t(lang).finder;
  return (
    <section className="section finder-teaser">
      <div className="wrap">
        <div className="sec-head">
          <div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={d.title} /></div>
          <div><p className="lead fade">{d.sub}</p><Link href={href(lang, 'finder')} className="btn btn-red fade" style={{ marginTop: 26 }}>{d.open} <Arrow /></Link></div>
        </div>
        <Lazy h={620}><Finder lang={lang} mode="teaser" /></Lazy>
      </div>
    </section>
  );
}

export function Process({ lang }: { lang: Lang }) {
  const d = t(lang).process; const sec = useRef<HTMLElement>(null); const pinEl = useRef<HTMLDivElement>(null); const track = useRef<HTMLDivElement>(null);
  // layout effect: the pin is undone before React removes the DOM on route change (a pin wraps the pinned
  // node in a spacer; tearing it down after removal crashed client-side navigation with removeChild)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const tr = track.current!;
      const tw = gsap.to(tr, { x: () => -(tr.scrollWidth - innerWidth + 80), ease: 'none', scrollTrigger: { trigger: sec.current, start: 'top top', end: () => '+=' + (tr.scrollWidth - innerWidth), scrub: 0.6, pin: pinEl.current, invalidateOnRefresh: true } });
      return () => tw.kill();
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={sec} className="process">
      <div ref={pinEl} className="process-in">
        <div className="wrap"><span className="eyebrow">{d.eyebrow}</span><Split className="h1" lines={d.title} /></div>
        <div ref={track} className="process-track">
          {d.steps.map(([h, p], i) => (
            <div className="pstep" key={i}>
              <span className="pstep-n mono">0{i + 1}</span>
              <div className="pstep-vis" aria-hidden><i style={{ width: `${(i + 1) * 25}%` }} /></div>
              <h3 className="h3">{h}</h3><p className="muted">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function B2B({ lang }: { lang: Lang }) {
  const d = t(lang).b2b;
  return (
    <section className="section">
      <div className="wrap">
        <div className="b2b fade">
          <div className="b2b-grid grid-bg" aria-hidden />
          <div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={d.title} /><p className="lead">{d.sub}</p></div>
          <div className="b2b-cta">
            <a href="https://akintraktor.com.tr/b2b/login.php" target="_blank" rel="noopener" className="btn btn-white">{d.cta} <Arrow /></a>
            <Link href={href(lang, 'contact')} className="btn btn-ghost">{d.cta2}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactCta({ lang }: { lang: Lang }) {
  const d = t(lang).contactCta;
  return (
    <section className="section cta-band">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Split className="h1" lines={d.title} />
        <p className="lead fade" style={{ margin: '24px auto 34px' }}>{d.sub}</p>
        <div className="fade" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn-red" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener"><span style={{ width: 18, display: 'inline-flex' }}><WaIcon /></span>{d.wa}</a>
          <a className="btn btn-ghost" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{d.call} · {CONTACT.phone}</a>
        </div>
      </div>
    </section>
  );
}
