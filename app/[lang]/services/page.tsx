import type { Metadata } from 'next';
import { B2B, ContactCta } from '@/components/home/Sections';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { t } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Hizmetler' : 'Services' }; }

export default async function Services({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).services;
  return (
    <>
      <section className="phero"><div className="wrap">
        <span className="eyebrow">{d.eyebrow}</span><Split as="h1" className="h1" lines={d.title} /><p className="lead fade">{d.sub}</p>
      </div></section>
      <section className="section" style={{ paddingTop: 40 }}><div className="wrap">
        {d.items.map(([h, p, list], i) => (
          <div className="svc fade" key={h as string}>
            <span>0{i + 1}</span>
            <div><h2 className="h2" style={{ fontSize: 'clamp(28px,3vw,46px)' }}>{h}</h2><p className="muted" style={{ marginTop: 14, maxWidth: '44ch' }}>{p}</p></div>
            <ul>{(list as string[]).map(x => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div></section>
      <B2B lang={lang} />
      <ContactCta lang={lang} />
    </>
  );
}
