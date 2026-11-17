import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Arrow, Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { COMPAT_BRANDS, c } from '@/lib/content';
import { href } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Referanslar' : 'References' }; }

export default async function References({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = c(lang).refs;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} lead={d.lead} kind="brake" />
      <section className="section" style={{ paddingTop: 20 }}><div className="wrap">
        <div className="rstats">{d.stats.map(([v, l], i) => <div key={l} className="fade" style={{ transitionDelay: i * 70 + 'ms' }}><b>{v}</b><span>{l}</span></div>)}</div>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head"><div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={d.projectsT} /></div></div>
        <div className="cases">{d.projects.map((p, i) => (
          <article key={p.t} className="case fade" style={{ transitionDelay: i * 90 + 'ms' }}>
            <div className="case-top"><span className="case-y mono">{p.y}</span><span className="tag">{p.loc}</span></div>
            <h3 className="h3">{p.t}</h3><p className="muted">{p.d}</p>
            <div className="case-k">{p.k.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
          </article>))}</div>
      </div></section>
      <section className="section quotes-s"><div className="wrap">
        <div className="sec-head"><div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={d.quotesT} /></div></div>
        <div className="quotes" data-lenis-prevent>{d.quotes.map(([q, n, co], i) => (
          <figure key={n} className="quote fade" style={{ transitionDelay: i * 90 + 'ms' }}>
            <span className="quote-m" aria-hidden>“</span><blockquote>{q}</blockquote>
            <figcaption><i aria-hidden>{n.split(' ').map(w => w[0]).join('')}</i><span><b>{n}</b>{co}</span></figcaption>
          </figure>))}</div>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sec-head"><div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={d.sectorsT} /></div></div>
        <div className="sectors">{d.sectors.map(([h, t], i) => <div key={h} className="sector fade" style={{ transitionDelay: i * 60 + 'ms' }}><span className="mono">0{i + 1}</span><h3>{h}</h3><p className="muted">{t}</p></div>)}</div>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="brands-h"><span className="eyebrow">{d.brandsT}</span><span className="mono muted">{d.brandsNote}</span></div>
        <div className="brands">{COMPAT_BRANDS.map(b => <span key={b}>{b}</span>)}</div>
      </div></section>
      <section className="section cta-band"><div className="wrap" style={{ textAlign: 'center' }}>
        <Split className="h1" lines={d.ctaT} />
        <div className="fade" style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-red" href={href(lang, 'products') + '#finder'}>{d.cta} <Arrow /></Link>
          <Link className="btn btn-ghost" href={href(lang, 'contact')}>{d.cta2}</Link>
        </div>
      </div></section>
    </>
  );
}
