import type { Metadata } from 'next';
import Link from 'next/link';
import { Marquee, Stats } from '@/components/home/Sections';
import PageHero from '@/components/PageHero';
import Timeline from '@/components/Timeline';
import { Arrow, Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { href, t } from '@/lib/i18n';
import { p } from '@/lib/pages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Hakkımızda' : 'About' }; }

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).about; const x = p(lang).about;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} lead={d.intro} kind="gear" />
      <Stats lang={lang} />
      <section className="section"><div className="wrap story">
        <div className="story-l"><span className="eyebrow">{x.storyEyebrow}</span><Split className="h2" lines={x.story} /></div>
        <div className="story-r">{x.paras.map((t, i) => <p key={i} className="fade" style={{ transitionDelay: i * 90 + 'ms' }}>{t}</p>)}</div>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap">
        <span className="eyebrow">{d.timelineTitle}</span>
        <Timeline rows={d.timeline} />
      </div></section>
      <Marquee lang={lang} />
      <section className="section"><div className="wrap">
        <div className="sec-head"><div><span className="eyebrow">{d.valuesTitle}</span><Split className="h2" lines={[x.why]} /></div></div>
        <div className="vgrid">{x.reasons.map(([h, t], i) => <div className="vcard fade" key={h} style={{ transitionDelay: i * 80 + 'ms' }}><span>0{i + 1}</span><h3 className="h3">{h}</h3><p className="muted">{t}</p></div>)}</div>
        <div className="vgrid" style={{ marginTop: 14 }}>{d.values.map(([h, t], i) => <div className="vcard vcard-s fade" key={h} style={{ transitionDelay: i * 80 + 'ms' }}><h3>{h}</h3><p className="muted">{t}</p></div>)}</div>
      </div></section>
      <section className="section cta-band"><div className="wrap" style={{ textAlign: 'center' }}>
        <Split className="h1" lines={x.ctaT} />
        <div className="fade" style={{ marginTop: 32 }}><Link className="btn btn-red" href={href(lang, 'finder')}>{x.ctaB} <Arrow /></Link></div>
      </div></section>
    </>
  );
}
