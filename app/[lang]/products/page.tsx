import type { Metadata } from 'next';
import Catalog from '@/components/Catalog';
import PageHero from '@/components/PageHero';
import type { Lang } from '@/lib/catalog';
import { p } from '@/lib/pages';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Ürün Kataloğu' : 'Product Catalogue' }; }

export default async function Products({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const x = p(lang).catalog;
  return (
    <>
      <PageHero eyebrow={x.eyebrow} title={x.title} lead={x.lead} kind="shaft" />
      <section className="section" style={{ paddingTop: 10 }}><div className="wrap"><Catalog lang={lang} /></div></section>
    </>
  );
}
