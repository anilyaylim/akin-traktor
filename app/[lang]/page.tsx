import Hero from '@/components/home/Hero';
import { B2B, ContactCta, FinderTeaser, Marquee, Process, Stats, Systems } from '@/components/home/Sections';
import type { Lang } from '@/lib/catalog';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <>
      <Hero lang={lang} />
      {/* light band between the navy sections (dark version); a no-op in the light version */}
      <div className="sec-lt">
        <Marquee lang={lang} />
        <Stats lang={lang} />
        <Systems lang={lang} />
      </div>
      <FinderTeaser lang={lang} />
      <Process lang={lang} />
      <div className="sec-lt"><B2B lang={lang} /></div>
      <ContactCta lang={lang} />
    </>
  );
}
