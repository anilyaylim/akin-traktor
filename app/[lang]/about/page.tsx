import type { Metadata } from 'next';
import { Marquee, Stats } from '@/components/home/Sections';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { t } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Hakkımızda' : 'About' }; }

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).about;
  return (
    <>
      <section className="phero"><div className="wrap">
        <span className="eyebrow">{d.eyebrow}</span><Split as="h1" className="h1" lines={d.title} />
        <p className="lead fade" style={{ maxWidth: '58ch' }}>{d.intro}</p>
      </div></section>
      <Stats lang={lang} />
      <section className="section"><div className="wrap">
        <span className="eyebrow">{d.timelineTitle}</span>
        <div className="tl" style={{ marginTop: 30 }}>
          {d.timeline.map(([y, h, p]) => <div className="tl-row fade" key={y}><b className="mono">{y}</b><h3 className="h3">{h}</h3><p className="muted">{p}</p></div>)}
        </div>
      </div></section>
      <Marquee />
      <section className="section"><div className="wrap">
        <div className="sec-head"><div><span className="eyebrow">{d.valuesTitle}</span></div></div>
        <div className="vgrid">{d.values.map(([h, p], i) => <div className="vcard fade" key={h} style={{ transitionDelay: i * 80 + 'ms' }}><span>0{i + 1}</span><h3 className="h3">{h}</h3><p className="muted">{p}</p></div>)}</div>
      </div></section>
    </>
  );
}
