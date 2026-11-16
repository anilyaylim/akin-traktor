import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
import { Split } from '@/components/ui';
import type { Lang } from '@/lib/catalog';
import { t } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'Teklif Sepeti' : 'Quote List' }; }

export default async function Quote({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang }; const d = t(lang).quote;
  return (
    <>
      <section className="phero"><div className="wrap"><span className="eyebrow">B2B</span><Split as="h1" className="h1" lines={d.title} /></div></section>
      <section className="section" style={{ paddingTop: 50 }}><div className="wrap"><QuoteForm lang={lang} /></div></section>
    </>
  );
}
