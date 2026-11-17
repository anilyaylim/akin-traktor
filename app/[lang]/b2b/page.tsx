import type { Metadata } from 'next';
import B2BLogin from '@/components/B2BLogin';
import type { Lang } from '@/lib/catalog';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return { title: lang === 'tr' ? 'B2B Bayi Portalı' : 'B2B Dealer Portal' }; }

export default async function B2BPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  return <B2BLogin lang={lang} />;
}
