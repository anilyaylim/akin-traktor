import type { Metadata } from 'next';
import Finder from '@/components/Finder';
import GroupGrid from '@/components/GroupGrid';
import PageHero from '@/components/PageHero';
import type { Lang } from '@/lib/catalog';
import { t } from '@/lib/i18n';
import { p } from '@/lib/pages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; return { title: lang === 'tr' ? 'Ürünler & Parça Bulucu' : 'Products & Part Finder' };
}

export default async function Products({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).finder; const x = p(lang).products;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} lead={d.sub} />
      <section className="section" style={{ paddingTop: 20, paddingBottom: 40 }}><div className="wrap">
        <div className="ggrid-h"><span className="eyebrow">{x.groupsT}</span><p className="muted">{x.groupsSub}</p></div>
        <GroupGrid lang={lang} />
      </div></section>
      <section id="finder" className="section" style={{ paddingTop: 30, scrollMarginTop: 80 }}>
        <div className="wrap"><Finder lang={lang} /></div>
      </section>
    </>
  );
}
