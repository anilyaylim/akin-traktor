import Hero from '@/components/home/Hero';
import { B2B, ContactCta, FinderTeaser, Marquee, Process, Stats, Systems } from '@/components/home/Sections';
import type { Lang } from '@/lib/catalog';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <>
      <Hero lang={lang} />
      <Marquee lang={lang} />
      <Stats lang={lang} />
      <Systems lang={lang} />
      <FinderTeaser lang={lang} />
      <Process lang={lang} />
      <B2B lang={lang} />
      <ContactCta lang={lang} />
    </>
  );
}
