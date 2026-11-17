import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '../globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Assistant from '@/components/Assistant';
import ScrollTop from '@/components/ScrollTop';
import { LANGS } from '@/lib/i18n';
import type { Lang } from '@/lib/catalog';
import { LIGHT } from '@/lib/theme';

export const dynamicParams = false;
export function generateStaticParams() { return LANGS.map(lang => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: { default: lang === 'tr' ? 'AKIN · Traktör Yedek Parça' : 'AKIN · Tractor Spare Parts', template: '%s · AKIN' },
    description: lang === 'tr' ? 'Traktör güç aktarma, hidrolik ve fren yedek parçaları. 565 stok kodu, Parça Bulucu ve çevrim içi teklif. Konya, 1998’den beri.' : 'Tractor powertrain, hydraulic and brake spare parts. 565 stock codes, Part Finder and online quotes. Konya, since 1998.',
    robots: { index: false, follow: false },
    alternates: { languages: { tr: '/tr/', en: '/en/' } },
  };
}
export const viewport: Viewport = { themeColor: LIGHT ? '#f3f5f8' : '#0a0b0d', width: 'device-width', initialScale: 1 };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <html lang={lang} className={`${GeistSans.variable} ${GeistMono.variable}${LIGHT ? ' light' : ''}`}>
      <body>
        <Providers>
          <Header lang={lang} />
          <main>{children}</main>
          <Footer lang={lang} />
          <ScrollTop lang={lang} />
          <Assistant lang={lang} />
        </Providers>
      </body>
    </html>
  );
}
