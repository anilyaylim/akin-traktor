import type { Metadata } from 'next';
import NewsList from '@/components/NewsList';
import PageHero from '@/components/PageHero';
import type { Lang } from '@/lib/catalog';
import { c } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Haberler & Blog' : 'News & Blog' }; }

export default async function News({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = c(lang).news;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} lead={d.lead} />
      <section className="section" style={{ paddingTop: 30 }}><div className="wrap"><NewsList lang={lang} /></div></section>
    </>
  );
}
