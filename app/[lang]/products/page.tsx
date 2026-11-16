import type { Metadata } from 'next';
import Finder from '@/components/Finder';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { t } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; return { title: lang === 'tr' ? 'Ürünler & Parça Bulucu' : 'Products & Part Finder' };
}

export default async function Products({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).finder;
  return (
    <>
      <section className="phero">
        <div className="wrap">
          <span className="eyebrow">{d.eyebrow}</span>
          <Split as="h1" className="h1" lines={d.title} />
          <p className="lead fade">{d.sub}</p>
        </div>
      </section>
      <section id="finder" className="section" style={{ paddingTop: 50, scrollMarginTop: 80 }}>
        <div className="wrap"><Finder lang={lang} /></div>
      </section>
    </>
  );
}
