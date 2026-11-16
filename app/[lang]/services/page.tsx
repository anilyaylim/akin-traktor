import type { Metadata } from 'next';
import { B2B, ContactCta } from '@/components/home/Sections';
import PageHero from '@/components/PageHero';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { t } from '@/lib/i18n';
import { p } from '@/lib/pages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Hizmetler' : 'Services' }; }

export default async function Services({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).services; const x = p(lang).services;
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: x.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero eyebrow={d.eyebrow} title={d.title} lead={d.sub} kind="clutch" />
      <section className="section" style={{ paddingTop: 30 }}><div className="wrap">
        {d.items.map(([h, txt, list], i) => (
          <div className="svc fade" key={h as string}>
            <span>0{i + 1}</span>
            <div><h2 className="h2" style={{ fontSize: 'clamp(28px,3vw,46px)' }}>{h}</h2><p className="muted" style={{ marginTop: 14, maxWidth: '44ch' }}>{txt}</p></div>
            <ul>{(list as string[]).map(li => <li key={li}>{li}</li>)}</ul>
          </div>
        ))}
      </div></section>
      <section className="section how"><div className="wrap">
        <div className="sec-head"><div><span className="eyebrow">{d.eyebrow}</span><Split className="h2" lines={[x.how]} /></div></div>
        <ol className="steps">{x.steps.map(([h, s], i) => <li key={h} className="fade" style={{ transitionDelay: i * 90 + 'ms' }}><span className="mono">0{i + 1}</span><h3 className="h3">{h}</h3><p className="muted">{s}</p></li>)}</ol>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="wrap faq-w">
        <div><span className="eyebrow">FAQ</span><Split className="h2" lines={[x.faqT]} /></div>
        <div className="faq">{x.faq.map(([q, a], i) => <details key={q} className="fade" open={i === 0}><summary>{q}<i aria-hidden /></summary><p className="muted">{a}</p></details>)}</div>
      </div></section>
      <B2B lang={lang} />
      <ContactCta lang={lang} />
    </>
  );
}
