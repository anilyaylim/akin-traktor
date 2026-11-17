import type { Metadata } from 'next';
import Finder from '@/components/Finder';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { p } from '@/lib/pages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Parça Bulucu' : 'Part Finder' }; }

export default async function FinderPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const x = p(lang).finderPage;
  return (
    <section className="fpage">
      <div className="wrap">
        <div className="fpage-h"><div><span className="eyebrow">{x.eyebrow}</span><Split as="h1" className="h2" lines={x.title} /></div><p className="lead fade">{x.lead}</p></div>
        <Finder lang={lang} />
      </div>
    </section>
  );
}
